## ri-translate

a simple translate tool for zh-en.

## 1. Basic Usage

how to use?:

```bash
npm install react-native-magic-list --save
```

first you need a file such as:

```javascript
module.exports = {
  en: {
  },

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
    curtain11: '罗马杆',
  }
};

```

next

```bash
rigo -f ./strings.js -o ./result
```
