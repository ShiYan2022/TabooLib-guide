import { KetherActionModule } from './index';

const chemdah: KetherActionModule = {
  name: "Chemdah",
  color: "#3dd68c",
  actions: [
    {
      id: "block",
      name: "Block",
      description: "获取坐标中的 X、Y、Z 轴整数值。",
      provider: "Chemdah",
      type: "public",
      categories: ["世界与坐标"],
      syntax: "block (x|y|z) in \{location\}",
      example: "block x in location world 0 0 0"
    },
    {
      id: "cancel",
      name: "Cancel",
      description: "作用于\{任务\}或\{对话\}开始时的脚本代理中，可取消行为。",
      provider: "Chemdah",
      type: "private",
      categories: ["游戏系统"],
      syntax: "cancel",
      example: "cancel"
    },
    {
      id: "ceil",
      name: "Ceil",
      description: "向上取整",
      provider: "Chemdah",
      type: "private",
      categories: ["逻辑与数学"],
      syntax: "ceil \{aciton\}",
      example: "ceil 3.1"
    },
    {
      id: "close",
      name: "Close",
      description: "作用于\{对话\}的脚本代理中，可结束对话。",
      provider: "Chemdah",
      type: "private",
      categories: ["游戏系统"],
      syntax: "close",
      example: "close"
    },
    {
      id: "distance",
      name: "Distance",
      description: "判断两个坐标之间的距离，若两坐标位于不同世界则返回 -1。",
      provider: "Chemdah",
      type: "public",
      categories: ["世界与坐标", "逻辑与数学"],
      syntax: "distance \{location\} to \{location\}",
      example: "distance location world 0 0 0 to location world 10 10 10"
    },
    {
      id: "equipment_check",
      name: "Equipment Check",
      description: "检查玩家装备是否为特定物品，使用 \{Chemdah\} 物品表达式。\r\\n表达式帮助详见 \{Chemdah\} 文档。\r\\n\r\\n可用位置：\r\\n\{主手\}：hand, mainhand\r\\n\{副手\}：offhand\r\\n\{头盔\}：head, helmet\r\\n\{胸甲\}：chest, chestplate\r\\n\{护腿\}：legs, leggings\r\\n\{鞋子\}：boots, feet",
      provider: "Chemdah",
      type: "public",
      categories: ["物品管理", "实体控制"],
      syntax: "inventory \{equipment\} is \{token\} \[amount \{int\}\]",
      example: "inventory helmet is \"minecraft:iron_helmet\"\r\\ninventory chestplate is \"minecraft:diamond_chestplate\" amount 1"
    },
    {
      id: "floor",
      name: "Floor",
      description: "向下取整",
      provider: "Chemdah",
      type: "private",
      categories: ["逻辑与数学"],
      syntax: "floor \{aciton\}",
      example: "floor 3.9"
    },
    {
      id: "goto",
      name: "Goto",
      description: "跳转到特定对话结构中。",
      provider: "Chemdah",
      type: "private",
      categories: ["游戏系统"],
      syntax: "goto \{token\}",
      example: "goto conversation_0"
    },
    {
      id: "inventory_count",
      name: "Inventory Count",
      description: "获取玩家背包中的特定物品数量，使用 \{Chemdah\} 物品表达式。\r\\n表达式帮助详见 \{Chemdah\} 文档。",
      provider: "Chemdah",
      type: "public",
      categories: ["物品管理", "实体控制"],
      syntax: "inventory (count|amount) \{token\}",
      example: "inventory count \"minecraft:stone\""
    },
    {
      id: "inventory_check",
      name: "Inventory Check",
      description: "检查玩家背包中是否含有特定物品，使用 \{Chemdah\} 物品表达式。\r\\n表达式帮助详见 \{Chemdah\} 文档。",
      provider: "Chemdah",
      type: "public",
      categories: ["物品管理", "实体控制"],
      syntax: "inventory check \{token\} \[amount \{int\}\]",
      example: "inventory check \"minecraft:stone\"\r\\ninventory check \"minecraft:diamond\" amount 1"
    },
    {
      id: "inventory_close",
      name: "Inventory Close",
      description: "关闭玩家当前页面。",
      provider: "Chemdah",
      type: "public",
      categories: ["物品管理", "实体控制"],
      syntax: "inventory close",
      example: "inventory close"
    },
    {
      id: "inventory_slot_check",
      name: "Inv Slot Check",
      description: "检查玩家背包中某个位置是否为特定物品，使用 \{Chemdah\} 物品表达式。\r\\n表达式帮助详见 \{Chemdah\} 文档。",
      provider: "Chemdah",
      type: "public",
      categories: ["物品管理", "实体控制"],
      syntax: "inventory slot \{int\} is \{token\} \[amount \{int\}\]",
      example: "inventory slot 0 is \"minecraft:stone\"\r\\ninventory slot 1 is \"minecraft:diamond\" amount 1"
    },
    {
      id: "inventory_take",
      name: "Inventory Take",
      description: "检查玩家背包中是否含有特定物品并移除，使用 \{Chemdah\} 物品表达式。\r\\n表达式帮助详见 \{Chemdah\} 文档。",
      provider: "Chemdah",
      type: "public",
      categories: ["物品管理", "实体控制"],
      syntax: "inventory (remove|take) \{token\} \[amount \{int\}\]",
      example: "inventory take \"minecraft:stone\"\r\\ninventory take \"minecraft:diamond\" amount 1"
    },
    {
      id: "location_x,y,z",
      name: "Location X,Y,Z",
      description: "获取坐标中的 X、Y、Z、Yaw、Pitch 或修改。",
      provider: "Chemdah",
      type: "public",
      categories: ["世界与坐标"],
      syntax: "(x|y|z|yaw|pitch) in \{locaiton\} \[(to|add) \{action\}\]",
      example: "x in location world 0 0 0\r\\nx in location world 0 0 0 to 10"
    },
    {
      id: "max",
      name: "Max",
      description: "取两值之最大",
      provider: "Chemdah",
      type: "private",
      categories: ["逻辑与数学"],
      syntax: "max \{aciton\} \{action\}",
      example: "max 1 10"
    },
    {
      id: "min",
      name: "Min",
      description: "取两值之最小",
      provider: "Chemdah",
      type: "private",
      categories: ["逻辑与数学"],
      syntax: "min \{aciton\} \{action\}",
      example: "max 1 10"
    },
    {
      id: "mmocore_attribute_point",
      name: "MMOCore Attribute Point",
      description: "获取玩家的 \{MMOCore\} 属性点数。",
      provider: "Chemdah",
      type: "public",
      categories: ["实体控制"],
      syntax: "mmocore attribute point",
      example: "mmocore attribute point"
    },
    {
      id: "mmocore_class",
      name: "MMOCore Class",
      description: "获取玩家的 \{MMOCore\} 职业相关数据。",
      provider: "Chemdah",
      type: "public",
      categories: ["实体控制"],
      syntax: "mmocore class (id|name|point)",
      example: "mmocore class id\r\\nmmocore class name"
    },
    {
      id: "mmocore_level___exp",
      name: "MMOCore Level & Exp",
      description: "获取玩家的 \{MMOCore\} 等级或经验值。",
      provider: "Chemdah",
      type: "public",
      categories: ["实体控制"],
      syntax: "mmocore (level|experience|exp)",
      example: "mmocore level\r\\nmmocore experience"
    },
    {
      id: "mmocore_mana",
      name: "MMOCore Mana",
      description: "获取玩家的 \{MMOCore\} 法力值。",
      provider: "Chemdah",
      type: "public",
      categories: ["实体控制"],
      syntax: "mmocore mana",
      example: "mmocore mana"
    },
    {
      id: "mmocore_skill_point",
      name: "MMOCore Skill Point",
      description: "获取玩家的 \{MMOCore\} 技能点数。",
      provider: "Chemdah",
      type: "public",
      categories: ["实体控制"],
      syntax: "mmocore skill point",
      example: "\{mmocore skill point\}"
    },
    {
      id: "mmocore_stamina",
      name: "MMOCore Stamina",
      description: "获取玩家的 \{MMOCore\} 耐力值。",
      provider: "Chemdah",
      type: "public",
      categories: ["实体控制"],
      syntax: "mmocore stamina",
      example: "\{mmocore stamina\}"
    },
    {
      id: "mythicmobs_cast",
      name: "MythicMobs Cast",
      description: "使玩家执行 \{MythicMobs\} 怪物技能。\r\\n\r\\n可用的 \{Trigger\} 类型：\r\\nDEFAULT, API, ATTACK, BOW_HIT, BLOCK, BLOCK_PLACE, BLOCK_BREAK, \r\\nCOMBAT, CONSUME, CROUCH, UNCROUCH, DAMAGED, DROPCOMBAT, DEATH, \r\\nDESPAWNED, ENTERCOMBAT, EXPLODE, INTERACT, KILL, KILLPLAYER, \r\\nPLAYERDEATH, SHOOT, SIGNAL, SPAWN, SPLASH_POTION, SWING, TARGETCHANGE, \r\\nTARGETED, TELEPORT, TIMER, USE, RIGHTCLICK, READY, CAST, FISH, \r\\nFISH_BITE, FISH_CATCH_FISH, FISH_CATCH_ENTITY, FISH_GROUND, FISH_REEL, \r\\nFISH_FAIL, TAME, TAME_FAIL, TRIDENT_THROW, TRIDENT_HIT, CUSTOM",
      provider: "Chemdah",
      type: "public",
      categories: ["实体控制"],
      syntax: "(mythicmobs|mm) cast \{token\} \[with \{trigger\}\]",
      example: "\{mm cast\} skill\r\\n\{mm cast\} skill \{with\} api"
    },
    {
      id: "origin",
      name: "Origin",
      description: "作用于\{对话\}的脚本代理中，可获取对话 NPC 的头顶坐标。",
      provider: "Chemdah",
      type: "private",
      categories: ["游戏系统", "世界与坐标"],
      syntax: "origin",
      example: "\{origin\}"
    },
    {
      id: "particle_normal",
      name: "Particle Normal",
      description: "在指定的坐标下播放粒子效果，若在结尾使用 \{@self\} 则只播放给自己。\r\\n\r\\n\{粒子表达式写法详见：\}\r\\nhttps://wiki.ptms.ink/index.php?title=Chemdah_通用粒子表达式",
      provider: "Chemdah",
      type: "public",
      categories: ["视觉特效"],
      syntax: "particle normal \{token\} (at|on) \{location\} \[@self\]",
      example: "\{particle normal\} \"flame 0 0 0 -count 10\" \{at\} location world 0 0 0\r\\n\{particle normal\} \"flame 0 0 0 -count 10 -speed 0.1\" \{at\} location world 0 0 0 \{@self\}"
    },
    {
      id: "position",
      name: "Position",
      description: "检测玩家是否在特定区域内，使用 \{Chemdah\} 坐标表达式。\r\\n表达式帮助详见 \{Chemdah\} 文档。",
      provider: "Chemdah",
      type: "public",
      categories: ["世界与坐标", "实体控制"],
      syntax: "position in\[side\] \{token\}",
      example: "\{position inside\} \"world 0 0 0 ~ 10\"\r\\n\{position inside\} \"world 0 0 0 > 10 10 10\"\r\\n"
    },
    {
      id: "profile_data",
      name: "Profile Data",
      description: "修改或获取玩家的变量。\r\\n玩家变量帮助详见 \{Chemdah\} 文档。\r\\n\r\\n在获取语法后使用 \{default\} 语句可在数据不存在时返回默认值，在追加（add）语句后使用 \{default\} 语句可在数据不存在时以该数据为基础进行追加（add）行为。",
      provider: "Chemdah",
      type: "public",
      categories: ["数据处理", "实体控制"],
      syntax: "profile data \{action\} \[(add|to) \{action\}\] \[default \{action\}\]\r\\nprofile data keys",
      example: "\{profile data\} key\r\\n\{profile data\} key \{default\} 10\r\\n\{profile data\} key \{to\} 10\r\\n\{profile data\} key \{add\} 1\r\\n\{profile data\} key \{add\} 1 \{default\} 10\r\\n\{profile data keys\}"
    },
    {
      id: "profile_level",
      name: "Profile Level",
      description: "修改或获取玩家\{自定义等级\}中的等级或经验。\r\\n自定义等级帮助详见 \{Chemdah\} 文档。",
      provider: "Chemdah",
      type: "public",
      categories: ["实体控制"],
      syntax: "profile level \{action\} (level|exp|exp-max) \[(add|to) \{action\}\]",
      example: "\{profile level\} default \{level\}\r\\n\{profile level\} default \{level\} to 100\r\\n\{profile level\} default \{exp\}\r\\n\{profile level\} default \{exp\} add 100"
    },
    {
      id: "quest_group_check",
      name: "Quest Group Check",
      description: "检测玩家是否接受或已完成任务组",
      provider: "Chemdah",
      type: "public",
      categories: ["游戏系统"],
      syntax: "quest-group (accepted|completed) \{action\}",
      example: "\{quest-group accepted\} example-group"
    },
    {
      id: "quest_check",
      name: "Quest Check",
      description: "检测玩家正在进行的或尚未接受的任务（已选择的）。\r\\n\r\\n可用行为：\r\\naccept-check（允许接受）accepted（是否已经接受）completed（是否已经完成）",
      provider: "Chemdah",
      type: "public",
      categories: ["游戏系统"],
      syntax: "quest \{check\}",
      example: "\{quest accepted\}\r\\n\{quest completed\}"
    },
    {
      id: "quest_control",
      name: "Quest Control",
      description: "控制玩家正在进行的或尚未接受的任务 (已选择的）。\r\\n\r\\n可用行为：\r\\naccept（接受任务）complete（完成任务）fail（放弃任务）restart（重置任务）stop（结束任务）",
      provider: "Chemdah",
      type: "public",
      categories: ["游戏系统"],
      syntax: "quest \{control\}",
      example: "\{quest accept\}\r\\n\{quest complete\}"
    },
    {
      id: "quest_progress",
      name: "Quest Progress",
      description: "获取玩家当前任务（已选择的）或任务（已选择的）中的某项条目的进度信息。",
      provider: "Chemdah",
      type: "public",
      categories: ["游戏系统"],
      syntax: "quest progress (value|target|percent|percent100) \[task \{action\}\]",
      example: "\{quest progress value\}\r\\n\{quest progress target task\} 0"
    },
    {
      id: "quest_select",
      name: "Quest Select",
      description: "选择任何一个服务器中存在的有效任务以供后续操作。",
      provider: "Chemdah",
      type: "public",
      categories: ["游戏系统"],
      syntax: "quest select \{action\}",
      example: "\{quest select\} 10_diamond_ore"
    },
    {
      id: "quest_data",
      name: "Quest Data",
      description: "修改或获取玩家当前任务（已选择的）中的变量。\r\\n任务变量帮助详见 \{Chemdah\} 文档。\r\\n\r\\n在获取语法后使用 \{default\} 语句可在数据不存在时返回默认值，在追加（add）语句后使用 \{default\} 语句可在数据不存在时以该数据为基础进行追加（add）行为。",
      provider: "Chemdah",
      type: "public",
      categories: ["游戏系统", "数据处理"],
      syntax: "quest data \{action\} \[(add|to) \{action\}\] \[default \{action\}\]\r\\nquest data keys",
      example: "\{quest data\} key\r\\n\{quest data\} key \{default\} 10\r\\n\{quest data\} key \{to\} 10\r\\n\{quest data\} key \{add\} 1\r\\n\{quest data\} key \{add\} 1 \{default\} 10\r\\n\{quest data keys\}"
    },
    {
      id: "quest_stats",
      name: "Quest Stats",
      description: "隐藏或刷新任务（已选择的）或任务（已选择的）中某项条目的进度显示。\r\\n使用一个单独的 \{\} 代表所有条目。",
      provider: "Chemdah",
      type: "public",
      categories: ["游戏系统"],
      syntax: "quest stats (hide |refresh\} \[task \{action|\}\]",
      example: "\{quest stats\} \{hide\}\r\\n\{quest stats\} \{refresh\} \{task\} \{\}\r\\n\{quest stats\} \{refresh\} \{task\} 0"
    },
    {
      id: "quest_tasks",
      name: "Quest Tasks",
      description: "获取某个任务 (已选择) 中的所有条目序号。",
      provider: "Chemdah",
      type: "public",
      categories: ["游戏系统"],
      syntax: "quest tasks",
      example: "\{quest tasks\}"
    },
    {
      id: "quest_this",
      name: "Quest This",
      description: "在 \{Chemdah\} 任务脚本代理中，返回当前任务或条目序号。",
      provider: "Chemdah",
      type: "private",
      categories: ["游戏系统"],
      syntax: "this \[task\]",
      example: "\{this\}\r\\n\{this task\}"
    },
    {
      id: "quest_track",
      name: "Quest Track",
      description: "使玩家追踪任务（已选择的）",
      provider: "Chemdah",
      type: "public",
      categories: ["游戏系统"],
      syntax: "quest track",
      example: "\{quest track\}"
    },
    {
      id: "quest_tracking",
      name: "Quest Tracking",
      description: "获取玩家正在追踪的任务名称",
      provider: "Chemdah",
      type: "public",
      categories: ["游戏系统"],
      syntax: "quest tracking",
      example: "\{quest tracking\}"
    },
    {
      id: "quests",
      name: "Quests",
      description: "获取玩家当前正在进行的所有任务，使用 \{self\} 则忽略共享（多人）任务。",
      provider: "Chemdah",
      type: "public",
      categories: ["游戏系统"],
      syntax: "quests \[self\]",
      example: "\{quests\}\r\\n\{quests\} self"
    },
    {
      id: "schematic",
      name: "Schematic",
      description: "在 \{#Location\} 构建的坐标出生成特定 \{WorldEdit\} 建筑模板。或旋转、忽略空气。",
      provider: "Chemdah",
      type: "public",
      categories: ["世界与坐标"],
      syntax: "schem\[atic\] \{action\} (at|on) \{location\} \[rotation \{int\}\] \[ignore air\]",
      example: "set loc to location world 0 0 0\r\\n\r\\n\{schematic\} ship \{at\} &loc\r\\n\{schematic\} ship \{at\} &loc \{ignore air\}\r\\n\{schematic\} ship \{at\} &loc \{rotation\} random array \[ 0 90 180 270 \] \{ignore air\}"
    },
    {
      id: "script",
      name: "Script",
      description: "运行或停止某个脚本文件。",
      provider: "Chemdah",
      type: "public",
      categories: ["脚本控制"],
      syntax: "script (run|stop) \{token\}",
      example: "\{script run\} def.ks\r\\n\{script stop\} def.ks\r\\n"
    },
    {
      id: "skillapi_attribute_point",
      name: "SkillAPI Attribute",
      description: "获取玩家的 \{SkillAPI\} 属性或属性点数。",
      provider: "Chemdah",
      type: "public",
      categories: ["实体控制"],
      syntax: "skillapi attribute (point|\{token\})",
      example: "\{skillapi attribute\} foo\r\\n\{skillapi attribute\} bar\r\\n\{skillapi attribute point\}"
    },
    {
      id: "skillapi_cast",
      name: "SkillAPI Cast",
      description: "使玩家执行 \{SkillAPI\} 技能。\r",
      provider: "Chemdah",
      type: "public",
      categories: ["实体控制"],
      syntax: "skillapi cast \{token\}",
      example: "\{skillapi cast\} skill\r"
    },
    {
      id: "skillapi_class",
      name: "SkillAPI Class",
      description: "获取玩家的 \{SkillAPI\} 职业相关数据。",
      provider: "Chemdah",
      type: "public",
      categories: ["实体控制"],
      syntax: "skillapi class (main|size)",
      example: "\{skillapi class\} main\r\\n\{skillapi class\} size"
    },
    {
      id: "skillapi_exp",
      name: "SkillAPI Exp",
      description: "获取玩家的 \{SkillAPI\} 当前经验值或升级所需经验。",
      provider: "Chemdah",
      type: "public",
      categories: ["实体控制"],
      syntax: "skillapi exp (total|required)",
      example: "\{skillapi experience\} total\r\\n\{skillapi experience\} required"
    },
    {
      id: "skillapi_level",
      name: "SkillAPI Level",
      description: "获取玩家的 \{SkillAPI\} 等级或是否满级。",
      provider: "Chemdah",
      type: "public",
      categories: ["实体控制"],
      syntax: "mmocore level \[maxed\]",
      example: "\{skillapi level\}\r\\n\{skillapi level maxed\}"
    },
    {
      id: "skillapi_mana",
      name: "SkillAPI Mana",
      description: "获取玩家的 \{SkillAPI\} 法力值。",
      provider: "Chemdah",
      type: "public",
      categories: ["实体控制"],
      syntax: "skillapi mana",
      example: "\{skillapi mana\}"
    },
    {
      id: "skillapi_skill_point",
      name: "SkillAPI Skill Point",
      description: "获取玩家的 \{SkillAPI\} 技能点数。",
      provider: "Chemdah",
      type: "public",
      categories: ["实体控制"],
      syntax: "skillapi skill point",
      example: "\{skillapi skill point\}"
    },
    {
      id: "talk",
      name: "Talk",
      description: "作用于 \{agent:begin\} 时：\r\\n增加 NPC 即将发送的对话内容。\r\\n\r\\n作用于 \{agent:refuse\}, \{agent:end\}, \{then\} 时：\r\\n使 NPC 立即发送特定内容，常用于对话的收尾。",
      provider: "Chemdah",
      type: "private",
      categories: ["游戏系统"],
      syntax: "talk \{token\}",
      example: "\{talk\} \"You win! number is \\\{\\\{ &number \\\}\\\}\"\r\\n\{talk\} \"All right, see you later.\""
    },
    {
      id: "trigger",
      name: "Trigger",
      description: "唤起玩家的 \{Trigger\} 任务。\r\\n关于该任务类型的帮助详见 \{Chemdah\} 文档。",
      provider: "Chemdah",
      type: "public",
      categories: ["游戏系统"],
      syntax: "trigger \{token\}",
      example: "\{trigger\} 10_diamond_ore"
    },
    {
      id: "ui",
      name: "UI",
      description: "仅作用于 \{UI\} 模块的配置文件中，用于构建任务的完成进度。\r\\n关于 UI 模块的帮助详见 \{Chemdah\} 文档。",
      provider: "Chemdah",
      type: "private",
      categories: ["界面交互", "游戏系统"],
      syntax: "ui (percent|bar \{token\}) \{token list\} \[exclude \{token list\}\]",
      example: "\{ui bar\} def \{\[\} L3 \{\]\}\r\\n\{ui percent\} \{\[\} L1 L2 L3 \{\] exclude \[\} S1 \{\]\}"
    },
    {
      id: "variable",
      name: "Variable",
      description: "修改或获取全局变量。\r\\n全局帮助详见 \{Chemdah\} 文档。\r\\n\r\\n在获取语法后使用 \{default\} 语句可在数据不存在时返回默认值，在追加（add）语句后使用 \{default\} 语句可在数据不存在时以该数据为基础进行追加（add）行为。",
      provider: "Chemdah",
      type: "private",
      categories: ["数据处理"],
      syntax: "var \{action\} \[(add|to) \{action\}\] \[default \{action\}\]\r\\nvar keys",
      example: "\{var\} key\r\\n\{var\} key \{default\} 10\r\\n\{var\} key \{to\} 10\r\\n\{var\} key \{add\} 1\r\\n\{var\} key \{add\} 1 \{default\} 10\r\\n\{var keys\}"
    },
    {
      id: "wizard",
      name: "Wizard",
      description: "唤起或停止 Wizard 引导",
      provider: "Chemdah",
      type: "private",
      categories: ["数据处理"],
      syntax: "wizard (to \{action\}|cancel)",
      example: "\{wizard\} to \"example_0\"\\n\{wizard\} cancel"
    },
    {
      id: "workflow_fetch",
      name: "Workflows Fetch",
      description: "定义离线补偿，当玩家在 \{fetch reset\} 语句执行前离开游戏时，\\n那么玩家下次进入游戏后将执行 \{fetch mark\} 中的语句。",
      provider: "Chemdah",
      type: "private",
      categories: ["脚本控制", "实体控制"],
      syntax: "fetch (mark \{token\} \{action\}|reset \{token\})",
      example: "\{fetch mark\} label_1 \{\\\{\} command inline \"give \\\{\\\{ sender \\\}\\\} diamond\" \{\\\}\}\\n\{fetch reset\} label_1"
    },
  ]
};

export default chemdah;
 
