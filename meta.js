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
      "message": "Project name"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "A Common Gulp project"
    },
    "author": {
      "type": "string",
      "message": "Author"
    },
    "type": {
      "type": "list",
      "message": "select type for your project",
      "choices": [
        {
          "name": "A PC project form common usage",
          "value": "pc",
          "short": "pc"
        },
        {
          "name": "A Mobile project with WeiXin JS-SDK and Moblink",
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
