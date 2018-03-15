module.exports = {

  "helpers": {
    "if_or": function (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }

      return options.inverse(this);
    }
  },
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "项目名称"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "项目描述",
      "default": "A Common Gulp project"
    },
    "author": {
      "type": "string",
      "message": "作者"
    },
    "type": {
      "type": "list",
      "message": "请选择项目类型",
      "choices": [
        {
          "name": "PC端（jquery-1.12.4）",
          "value": "pc",
          "short": "pc"
        },
        {
          "name": "移动端（集成微信JS-SDK、Moblink.js）",
          "value": "mobile",
          "short": "mobile"
        }
      ]
    }
  },
  "filters": {
    "src/script/jquery-1.12.4.min.js": "type === 'pc'",
    "src/script/zepto-1.2.0.min.js": "type === 'mobile'",
  },
  "completeMessage": "To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm run dev\n\nDocumentation can be found at https://github.com/ztjy-fe/pc-scaffolding"
};
