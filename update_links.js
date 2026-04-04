const fs = require('fs');
let content = fs.readFileSync('src/components/SocialFab.jsx', 'utf8');

content = content.replace(/https:\/\/linkedin\.com\/in\/[^\s',]*/, 'https://www.linkedin.com/in/deepak-kathiravan-53a932346?utm_source=share_via&utm_content=profile&utm_medium=member_android');

content = content.replace(/label: 'Twitter'/, \"label: 'Threads'\");
content = content.replace(/url: 'https:\/\/twitter\.com\/'/, \"url: 'https://www.threads.com/@abz.dpakkk.gg?invite=0'\");

content = content.replace(/url: 'https:\/\/instagram\.com\/'/, \"url: 'https://www.instagram.com/abz.dpakkk.gg?igsh=MTc2aG1sdDh5eTZtYw=='\");

content = content.replace(/url: 'https:\/\/youtube\.com\/'/, \"url: 'https://youtube.com/@abzdeepak_gg?si=hHdxrrDaKF9aW69X'\");

content = content.replace(/url: 'https:\/\/instagram\.com\/abz'/, \"url: 'https://www.instagram.com/autobotz_esports?igsh=MXE1d3UzZ3lmb3ZlbA=='\");

content = content.replace(/label: 'WA Channel'/, \"label: 'WA Community'\");
content = content.replace(/url: 'https:\/\/whatsapp\.com\/channel'/, \"url: 'https://chat.whatsapp.com/BRMVEH9bU5K5ifVnvJK6SM?mode=gi_t'\");

content = content.replace(/label: 'Website'/, \"label: 'Discord'\");
content = content.replace(/url: '#'/g, \"url: 'https://discord.gg/RKCU753xH'\");

content = content.replace(/color: 'linear-gradient\\(135deg,#2193b0,#6dd5ed\\)'/, \"color: 'linear-gradient(135deg,#5865F2,#4752C4)'\");

fs.writeFileSync('src/components/SocialFab.jsx', content);
console.log('Updated links successfully.');
