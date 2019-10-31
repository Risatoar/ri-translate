var http = require('http')
var fs = require('fs')
var inquirer = require('inquirer')
var log = require('./utils')
let language = 'en'

const map = {
  f: 'file',
  file: 'file',
	o: 'output',
	output: 'output',
}

const cmdOpts = (function() {
  const args = process.argv.slice(2)
  const opts = {}
  for (let index = 0; index < args.length; index++) {
    const opt = args[index].replace(/^-{1,2}/, '');
    index++
    opts[map[opt]] = args[index]
  }
  return opts
})()

const { file, output } = cmdOpts;
const { successLog, errLog, tipLog } = log
const fanyiUrl =
  'http://fanyi.youdao.com/openapi.do?keyfrom=node-translator&key=2058911035&type=data&doctype=json&version=1.1&q='
const languageCanbeTranslateTo = ['en', 'zh']

const chooseLanguage = () => {
  inquirer.prompt(
    [
      {
        type: 'list',
        name: 'choice',
        message: '请选择需要翻译的目标语言',
        choices: languageCanbeTranslateTo,
      },
    ],
    ({ choice }) => {
      language = choice
      translate()
    }
  )
}

const translate = async () => {
  const strings = require(file)
  const ret = { zh: strings.zh, en: {} }
  const startTime = new Date().getTime()
  const zh = strings.zh
  const keys = Reflect.ownKeys(zh)
  const len = keys.length
  let i = 0
  for (; i < len; i++) {
    const val = await fetchTranslateData(ret.zh[keys[i]])
    ret[language][keys[i]] = val
  }
  successLog('\n翻译完成')
  fs.exists('./result', exists => {
    if (exists) {
      const date = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
      const filePath = `${output || '.'}/result_(${date}).js`
      exportResult({ ret, startTime, filePath })
    } else {
    }
  })
}

const exportResult = ({ ret, startTime, filePath }) => {
  try {
    fs.writeFileSync(
      filePath,
      JSON.stringify(ret, null, '\t')
    )
    const endTime = new Date().getTime()
    const elapsedTime = (endTime - startTime) / 1000
    successLog(`导出成功!总共消耗时间${elapsedTime}s`)
  } catch (error) {
    errLog('导出失败')
  }
}

const fetchTranslateData = key => {
  return new Promise((resolve, reject) => {
    http.get(encodeURI(`${fanyiUrl}${key}`), req => {
      tipLog('\n' + '已经发送翻译请求。key为' + key)
      const startTime = new Date().getTime()
      //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
      req.on('data', function(data) {
        const recive = JSON.parse(data.toString())
        const ret = recive.translation.join('')
        const endTime = new Date().getTime()
        const elapsedTime = (endTime - startTime) / 1000
        successLog(
          `已经收到翻译结果\n消耗时长${elapsedTime}s\nkey: ${key}\n值: ${ret}`
        )
        resolve(ret)
      })
      req.on('error', err => reject(err))
    })
  })
}

chooseLanguage()
