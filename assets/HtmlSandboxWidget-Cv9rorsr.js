import{u as l,r as i,j as e,al as d,am as c}from"./react-vendor-C9LHBUkp.js";import{r as u}from"./index-DIQ32RE2.js";import"./vendor-BnVc6iZf.js";import"./editor-vendor-Dlj3R3R2.js";import"./i18n-vendor-DdbEjq8F.js";const b=()=>{const{t}=l(),[a,o]=i.useState(()=>`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background-color: #282c34; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    h1 { color: #61dafb; }
  </style>
</head>
<body>
  <h1>`+t("widgets.html_sandbox.paste_code_here")+`</h1>
  <script>
    // `+t("widgets.html_sandbox.your_javascript")+`
  <\/script>
</body>
</html>`),[s,n]=i.useState(!0);return e.jsxs("div",{className:"html-sandbox-widget",children:[e.jsx("button",{onClick:()=>n(!s),className:"toggle-view-button",title:t(s?"widgets.html_sandbox.show_preview":"widgets.html_sandbox.show_code"),children:s?e.jsx(d,{size:20}):e.jsx(c,{size:20})}),s&&e.jsx("div",{className:"editor-area",children:e.jsx("textarea",{value:a,onChange:r=>o(r.target.value),spellCheck:"false",className:"code-textarea"})}),e.jsx("div",{className:`preview-area ${s?"hidden":""}`,children:e.jsx("iframe",{srcDoc:a,title:t("widgets.html_sandbox.preview_title"),sandbox:"allow-scripts",className:"preview-iframe"})})]})};export{b as HtmlSandboxWidget,u as widgetConfig};
