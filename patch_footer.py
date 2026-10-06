import re
content = open('src/components/common/Footer.jsx', 'r', encoding='utf-8').read()
content = re.sub(r'<div className="bg-\[#4CAF50\] p-1\.5 rounded-lg">[\s\S]*?<Leaf className="w-5 h-5 text-white fill-white" />[\s\S]*?</div>[\s\S]*?<div className="flex flex-col">[\s\S]*?<span className="text-2xl font-black text-\[#11311F\] tracking-tighter leading-none">FA-X</span>[\s\S]*?</div>', '<img src={logoImg} alt="FA-X Logo" className="h-10 rounded shadow-sm" />', content)
open('src/components/common/Footer.jsx', 'w', encoding='utf-8').write(content)
