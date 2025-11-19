#!/usr/bin/env python3
"""
增量部署脚本 - 只上传修改过的文件到服务器
"""
import os
import sys
import hashlib
import subprocess
from pathlib import Path
from typing import Dict, Set, Tuple

def calculate_file_hash(file_path: Path) -> str:
    """计算文件的 MD5 哈希值"""
    hash_md5 = hashlib.md5()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

def get_local_files(build_dir: str) -> Dict[str, str]:
    """获取本地构建目录中所有文件及其哈希值"""
    local_files = {}
    build_path = Path(build_dir)

    if not build_path.exists():
        print(f"❌ 构建目录不存在: {build_dir}")
        sys.exit(1)

    print(f"📂 扫描本地文件: {build_dir}")
    for file_path in build_path.rglob("*"):
        if file_path.is_file():
            relative_path = str(file_path.relative_to(build_path))
            file_hash = calculate_file_hash(file_path)
            local_files[relative_path] = file_hash

    print(f"✅ 找到 {len(local_files)} 个本地文件")
    return local_files

def get_remote_files(ssh_host: str, ssh_user: str, ssh_key: str, ssh_port: str, remote_dir: str) -> Dict[str, str]:
    """获取服务器上所有文件及其哈希值"""
    remote_files = {}

    print(f"📡 连接服务器获取文件列表: {ssh_user}@{ssh_host}:{remote_dir}")

    # 先检查目录是否存在
    check_cmd = [
        "ssh",
        "-i", ssh_key,
        "-p", ssh_port,
        "-o", "StrictHostKeyChecking=no",
        f"{ssh_user}@{ssh_host}",
        f"test -d {remote_dir} && echo 'EXISTS' || echo 'NOT_EXISTS'"
    ]

    try:
        result = subprocess.run(check_cmd, capture_output=True, text=True, timeout=10)
        if result.stdout.strip() == 'NOT_EXISTS':
            print(f"⚠️  服务器目录不存在，将创建并上传所有文件")
            return remote_files
    except:
        print(f"⚠️  无法检查服务器目录，将上传所有文件")
        return remote_files

    # 使用并行的 md5sum 命令，并增加超时
    ssh_cmd = [
        "ssh",
        "-i", ssh_key,
        "-p", ssh_port,
        "-o", "StrictHostKeyChecking=no",
        f"{ssh_user}@{ssh_host}",
        f"cd {remote_dir} && find . -type f -print0 | xargs -0 -P 4 md5sum"
    ]

    try:
        print("⏳ 正在计算服务器文件哈希值（可能需要一些时间）...")
        result = subprocess.run(ssh_cmd, capture_output=True, text=True, timeout=3000)

        if result.returncode == 0:
            output = result.stdout.strip()
            if output:
                for line in output.split('\n'):
                    if line.strip():
                        parts = line.split(None, 1)
                        if len(parts) == 2:
                            file_hash, file_path = parts
                            # 移除 ./ 前缀
                            relative_path = file_path.lstrip('./')
                            remote_files[relative_path] = file_hash

            print(f"✅ 服务器上有 {len(remote_files)} 个文件")
        else:
            print(f"⚠️  获取文件列表失败，将上传所有文件")

    except subprocess.TimeoutExpired:
        print("⚠️  获取服务器文件列表超时（超过5分钟），将上传所有文件")
    except Exception as e:
        print(f"⚠️  获取服务器文件列表失败: {e}，将上传所有文件")

    return remote_files

def calculate_changes(local_files: Dict[str, str], remote_files: Dict[str, str]) -> Tuple[Set[str], Set[str]]:
    """计算需要上传和删除的文件"""
    local_set = set(local_files.keys())
    remote_set = set(remote_files.keys())

    # 需要上传的文件：新文件 + 修改过的文件
    files_to_upload = set()
    for file_path in local_set:
        if file_path not in remote_files or local_files[file_path] != remote_files[file_path]:
            files_to_upload.add(file_path)

    # 需要删除的文件：服务器有但本地没有的
    files_to_delete = remote_set - local_set

    return files_to_upload, files_to_delete

def upload_files(files: Set[str], build_dir: str, ssh_host: str, ssh_user: str,
                ssh_key: str, ssh_port: str, remote_dir: str) -> bool:
    """上传指定的文件到服务器"""
    if not files:
        print("✅ 没有文件需要上传")
        return True

    print(f"\n📤 准备上传 {len(files)} 个文件...")

    # 创建临时文件列表
    temp_file_list = "/tmp/files_to_upload.txt"
    with open(temp_file_list, 'w') as f:
        for file_path in sorted(files):
            f.write(f"{file_path}\n")

    # 使用 rsync 从文件列表上传
    rsync_cmd = [
        "rsync",
        "-avz",
        "--files-from=" + temp_file_list,
        "-e", f"ssh -i {ssh_key} -p {ssh_port} -o StrictHostKeyChecking=no",
        "--progress",
        "--stats",
        build_dir + "/",
        f"{ssh_user}@{ssh_host}:{remote_dir}/"
    ]

    try:
        print(f"🚀 执行上传命令...")
        # 增加超时到 30 分钟
        result = subprocess.run(rsync_cmd, timeout=1800)

        if result.returncode == 0:
            print(f"✅ 成功上传 {len(files)} 个文件")
            return True
        else:
            print(f"❌ 上传失败，退出码: {result.returncode}")
            return False

    except subprocess.TimeoutExpired:
        print("❌ 上传超时（超过30分钟）")
        return False
    except Exception as e:
        print(f"❌ 上传过程出错: {e}")
        return False
    finally:
        # 清理临时文件
        if os.path.exists(temp_file_list):
            os.remove(temp_file_list)

def delete_files(files: Set[str], ssh_host: str, ssh_user: str,
                ssh_key: str, ssh_port: str, remote_dir: str) -> bool:
    """删除服务器上的指定文件"""
    if not files:
        print("✅ 没有文件需要删除")
        return True

    print(f"\n🗑️  准备删除 {len(files)} 个文件...")

    # 构建删除命令
    files_str = " ".join([f"'{remote_dir}/{f}'" for f in files])
    delete_cmd = [
        "ssh",
        "-i", ssh_key,
        "-p", ssh_port,
        "-o", "StrictHostKeyChecking=no",
        f"{ssh_user}@{ssh_host}",
        f"cd {remote_dir} && rm -f {files_str}"
    ]

    try:
        result = subprocess.run(delete_cmd, timeout=60)

        if result.returncode == 0:
            print(f"✅ 成功删除 {len(files)} 个文件")
            return True
        else:
            print(f"⚠️  删除文件失败，退出码: {result.returncode}")
            return False

    except Exception as e:
        print(f"⚠️  删除过程出错: {e}")
        return False

def main():
    """主函数"""
    print("=" * 60)
    print("🚀 TabooLib 增量部署脚本")
    print("=" * 60)

    # 从环境变量获取配置
    build_dir = os.getenv("BUILD_DIR", "./build")
    ssh_host = os.getenv("SSH_HOST")
    ssh_user = os.getenv("SSH_USER")
    ssh_key = os.getenv("SSH_KEY_PATH", "/tmp/deploy_key")
    ssh_port = os.getenv("SSH_PORT", "22")
    remote_dir = os.getenv("TARGET_DIR")

    # 验证必需参数
    if not all([ssh_host, ssh_user, remote_dir]):
        print("❌ 缺少必需的环境变量: SSH_HOST, SSH_USER, TARGET_DIR")
        sys.exit(1)

    print(f"\n📋 配置信息:")
    print(f"  本地目录: {build_dir}")
    print(f"  服务器: {ssh_user}@{ssh_host}:{ssh_port}")
    print(f"  目标目录: {remote_dir}")
    print()

    # 获取文件列表
    local_files = get_local_files(build_dir)
    remote_files = get_remote_files(ssh_host, ssh_user, ssh_key, ssh_port, remote_dir)

    # 计算变更
    files_to_upload, files_to_delete = calculate_changes(local_files, remote_files)

    print(f"\n📊 变更统计:")
    print(f"  需要上传: {len(files_to_upload)} 个文件")
    print(f"  需要删除: {len(files_to_delete)} 个文件")
    print(f"  保持不变: {len(local_files) - len(files_to_upload)} 个文件")

    # 显示变更详情
    if files_to_upload:
        print(f"\n📤 需要上传的文件:")
        for file_path in sorted(list(files_to_upload)[:10]):  # 只显示前10个
            print(f"  + {file_path}")
        if len(files_to_upload) > 10:
            print(f"  ... 还有 {len(files_to_upload) - 10} 个文件")

    if files_to_delete:
        print(f"\n🗑️  需要删除的文件:")
        for file_path in sorted(list(files_to_delete)[:10]):  # 只显示前10个
            print(f"  - {file_path}")
        if len(files_to_delete) > 10:
            print(f"  ... 还有 {len(files_to_delete) - 10} 个文件")

    # 执行上传
    if not upload_files(files_to_upload, build_dir, ssh_host, ssh_user, ssh_key, ssh_port, remote_dir):
        print("\n❌ 部署失败")
        sys.exit(1)

    # 执行删除
    if not delete_files(files_to_delete, ssh_host, ssh_user, ssh_key, ssh_port, remote_dir):
        print("\n⚠️  删除文件时出现问题，但部署继续")

    print("\n" + "=" * 60)
    print("✅ 增量部署完成！")
    print("=" * 60)

if __name__ == "__main__":
    main()