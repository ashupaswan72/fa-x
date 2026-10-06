import re
content = open('index.html', 'r', encoding='utf-8').read()
content = re.sub(r'<link rel="manifest".*?>', '', content, flags=re.DOTALL)
content = re.sub(r'<script id="vite-plugin-pwa:register-sw".*?</script>', '', content, flags=re.DOTALL)
open('index.html', 'w', encoding='utf-8').write(content)
