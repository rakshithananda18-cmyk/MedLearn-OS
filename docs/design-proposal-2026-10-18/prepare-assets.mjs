import {copyFile,mkdir,readdir,readFile,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const folder=path.dirname(fileURLToPath(import.meta.url));
const repo=path.resolve(folder,'../..');
const uiRequire=createRequire(path.join(repo,'packages/ui/package.json'));
const webRequire=createRequire(path.join(repo,'apps/web/package.json'));
const React=webRequire('react');const {renderToStaticMarkup}=webRequire('react-dom/server');const icons=uiRequire('lucide-react');
const names=['Eraser','Undo2','CalendarCheck','Info','Sparkles','Activity','ArrowLeft','ArrowRight','BookOpen','BookMarked','Box','Brain','CalendarDays','CalendarClock','Check','ChevronDown','ChevronLeft','ChevronRight','Circle','CircleCheck','ClipboardCheck','Clock','Download','Eye','FileText','Flame','GraduationCap','House','Layers','ListChecks','LockKeyhole','Maximize2','Menu','Moon','MoreHorizontal','Pencil','PenLine','Play','Plus','RotateCcw','Search','Settings2','ShieldCheck','SlidersHorizontal','Sun','Timer','User','Users','WifiOff','X'];
const rendered={};for(const name of names){if(icons[name])rendered[name]=renderToStaticMarkup(React.createElement(icons[name],{width:24,height:24,strokeWidth:1.6,'aria-hidden':true}));}
await writeFile(path.join(folder,'icons.js'),`/* global window */
/* Lucide icons, ISC licence; rendered from the existing project dependency. */
window.MEDLEARN_ICONS = ${JSON.stringify(rendered)};
`);
await mkdir(path.join(folder,'assets/posters'),{recursive:true});
const used=new Set();for(const f of ['planning-pages.js','study-pages.js','utility-pages.js']){const content=await readFile(path.join(folder,f),'utf8');for(const m of content.matchAll(/ui\.image\(['"]([^'"]+)/g))used.add(m[1]);}
for(const name of used)await copyFile(path.join(repo,'apps/web/public/posters',name+'.webp'),path.join(folder,'assets/posters',name+'.webp'));
let blocks=[];const chunks=path.join(repo,'apps/web/.next/static/chunks');for(const f of await readdir(chunks)){if(!f.endsWith('.css'))continue;const css=await readFile(path.join(chunks,f),'utf8');blocks.push(...(css.match(/@font-face\{[^}]+\}/g)||[]));}
for(const [family,style,out]of[['Noto Sans','normal','body'],['Instrument Serif','normal','display'],['Instrument Serif','italic','display-italic']]){const b=blocks.find(b=>b.includes('font-family:'+family+';')&&b.includes('font-style:'+style+';')&&b.includes('unicode-range:U+??'));if(!b)throw Error('Missing font '+family+' '+style);const file=b.match(/url\(\.\.\/media\/([^)]*)\)/)[1];await copyFile(path.join(repo,'apps/web/.next/static/media',file),path.join(folder,'assets',out+'.woff2'));}
await writeFile(path.join(folder,'ASSET_NOTES.md'),`# Proposal asset notes

The gallery reuses the existing MedLearn anatomy posters (${[...used].join(', ')}), Noto Sans and Instrument Serif fonts, and Lucide icons. Anatomy is not newly generated or independently validated. The browser mockups are design proposals with illustrative state, not production screenshots or evidence of teaching accuracy.

## Anatomy provenance

Source credits are preserved from the repository, not independently reclassified:

- Knee bones: BodyParts3D, © The Database Center for Life Science, CC BY 4.0 (files marked CC BY-SA 2.1 JP).
- Knee capsules, ligaments and menisci: Z-Anatomy, CC BY-SA 4.0. The source model has no patellar ligament or anterior tibiotalar part of the deltoid ligament. The recognition still uses the existing cruciate-ligament sample and does not add either structure.
- Brachial plexus context: bones, muscles and vessels from BodyParts3D, © The Database Center for Life Science, CC BY 4.0 (files marked CC BY-SA 2.1 JP). Nerve paths are a MedLearn schematic, not yet medically reviewed.
- The diagram-trainer proposal uses nodes and label choices from the existing brachial-plexus drill; it is a schematic, not a new anatomy source.

See apps/web/src/content/lower-limb-joints-3d.ts, shoulder-3d.ts and brachial-plexus-3d.ts for the original model credit and source definitions. Preserve their attribution and applicable share-alike conditions when redistributing derivatives. The images do not carry an educator approval.

## Interface assets

Noto Sans and Instrument Serif are copied from the app's existing locally compiled font assets. Lucide icons are rendered from the existing project dependency (ISC licence). Keep upstream licence notices with redistributed assets. No AI-generated anatomy or additional illustration source is used.
`);
process.stdout.write(JSON.stringify({posters:[...used],icons:Object.keys(rendered).length,fonts:3})+'\n');
