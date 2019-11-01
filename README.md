## rigo

a simple translate tool for zh-en.

## 1. Basic Usage

how to use?:

```bash
yarn global add rigo
```

first you need a file such as:

```javascript
module.exports = {
	en: {},

	zh: {
		curtain0: '百叶窗',
		curtain1: '香格里拉窗帘',
		curtain2: '罗马帘',
		curtain3: '卷帘',
		curtain4: '柔纱帘',
		curtain5: '卷窗',
		curtain6: '蜂巢帘',
		curtain7: '百褶帘',
		curtain8: '卷闸门',
		curtain9: '遮阳蓬',
		curtain10: '开合帘',
		curtain11: '罗马杆'
	}
};
```

next

```bash
rigo -f /Users/risatoar/project/strings.js -o /Users/risatoar/project/result
```

command: rigo -f => Documents that need to be translated rigo -o => The location
to which the translated file needs to be exported

## Todo

At present, only absolute position of files is supported. Relative position
support will be added as soon as possible。

Currently, only Chinese to English is supported. Other languages will be added
as soon as possible。
