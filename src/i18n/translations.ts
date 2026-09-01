export type Locale = 'en' | 'dv' | 'ar';

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.sponsor': 'Share',
    'nav.project': 'Project Details',
    'nav.admin': 'Admin',

    // Hero
    'hero.title': 'Build the Al Irushaadh Office Together',
    'hero.subtitle': 'Join our community in building a space that serves everyone. Share 1 square foot and leave your mark.',
    'hero.cta': 'Share 1 Square Foot – 1320 MVR',

    // Progress
    'progress.title': 'Donation Progress',
    'progress.of': 'of',
    'progress.completed': 'Completed',
    'progress.target': 'Target: MVR 1,700,000',
    'progress.goal': 'Reached',
    'progress.extra': 'above target!',

    // About
    'about.title': 'About the Project',
    'about.description': 'Al Irushaadh is building an office to serve as a hub for community services, education, and coordination. This office will strengthen the bonds of our community and provide essential services for generations to come.',
    'about.why': 'Why This Matters',
    'about.why.text': 'A dedicated office space enables Al Irushaadh to better serve the Muslim community through organized programs, counseling, educational initiatives, and administrative coordination.',

    // Sponsor page
    'sponsor.title': 'Share a Square Foot',
    'sponsor.subtitle': 'Each square foot costs 1320 MVR. Your share directly supports the construction of the Al Irushaadh office.',
    'sponsor.price': '1,320 MVR',
    'sponsor.per': 'per square foot',
    'sponsor.bank.title': 'Bank Transfer Details',
    'sponsor.bank.name': 'Bank of Maldives (BML Islamic)',
    'sponsor.bank.account': 'Account Number',
    'sponsor.bank.holder': 'Account Name',
    'sponsor.bank.holder.value': 'Al Irushaadh',
    'sponsor.bank.note': 'Please include "Al Irushaadh" as the transfer reference.',
    'sponsor.howto': 'How to Share',
    'sponsor.step1': 'Choose how many square feet you want to share',
    'sponsor.step2': 'Transfer the amount to the bank account above',
    'sponsor.step3': 'Include "Al Irushaadh" as your reference',
    'sponsor.step4': 'Your contribution will be reflected in the progress bar',

    // Project page
    'project.title': 'Project Details',
    'project.building.title': 'The Al Irushaadh Office Building',
    'project.building.desc': 'The proposed Al Irushaadh office building is designed to be a modern, functional space that serves the diverse needs of the Muslim community. The building will house administrative offices, meeting rooms, and community service facilities.',
    'project.purpose.title': 'Purpose of the Office',
    'project.purpose.item1': 'Administrative hub for Al Irushaadh',
    'project.purpose.item2': 'Community counseling and support services',
    'project.purpose.item3': 'Educational program coordination',
    'project.purpose.item4': 'Event planning and community gathering space',
    'project.purpose.item5': 'Resource center for Islamic education materials',
    'project.sqft.title': 'The Square Foot Concept',
    'project.sqft.desc': 'The total building area is 1,320 square feet. We have divided the project into 1,320 equal share units — each representing 1 square foot of the building. By sharing one or more square feet at 1,320 MVR each, you directly contribute to making this project a reality.',
    'project.gallery.title': 'Building Design',

    // Footer
    'footer.rights': '© 2026 Al Irushaadh. All rights reserved.',
    'footer.dua': 'May Allah reward your generosity.',

    // Common
    'common.donate': 'Donate Now',
    'common.learnMore': 'Learn More',
  },
  dv: {
    'nav.home': 'ފުރަތަމަ ޞަފްޙާ',
    'nav.sponsor': 'ޙިއްޞާ',
    'nav.project': 'މަޝްރޫޢުގެ ތަފްޞީލް',
    'nav.admin': 'އެޑްމިން',

    'hero.title': 'އަލް އިރުޝާދުގެ އޮފީސް އެކުގައި ބިނާކުރައްވާ',
    'hero.subtitle': 'އެންމެންނަށް ޚިދުމަތް ކުރެވޭ ތަނެއް ބިނާކުރުމުގައި މުޖުތަމަޢާ ބައިވެރިވެލައްވާ. 1 އަކަފޫޓް ޙިއްޞާ ކުރައްވާ.',
    'hero.cta': '1 އަކަފޫޓް ޙިއްޞާ ކުރައްވާ – 1320 ރުފިޔާ',

    'progress.title': 'ފައިސާ ލިބެމުންދާ މިންވަރު',
    'progress.of': '/',
    'progress.completed': 'ފުރިހަމަ ވެއްޖެ',
    'progress.target': 'ޓާގެޓް: MVR 1,700,000',
    'progress.goal': 'ލިބިފައި',
    'progress.extra': 'ޓާގެޓަށް ވުރެ އިތުރު!',

    'about.title': 'މަޝްރޫޢާ ބެހޭ',
    'about.description': 'އަލް އިރުޝާދުން ދަނީ މުޖުތަމަޢުގެ ޚިދުމަތްތަކާއި ތަޢުލީމާއި ގުޅުން ބަދަހިކުރުމުގެ މަރުކަޒެއްގެ ގޮތުގައި އޮފީހެއް ބިނާކުރަމުންނެވެ.',
    'about.why': 'މިކަން މުހިންމުވަނީ ކީއްވެ',
    'about.why.text': 'ޚާއްޞަ އޮފީސް ޖާގައެއް ހުރުމުން އަލް އިރުޝާދަށް މުސްލިމް މުޖުތަމަޢަށް ރަނގަޅަށް ޚިދުމަތް ކުރެވޭނެއެވެ.',

    'sponsor.title': 'އަކަފޫޓެއް ޙިއްޞާ ކުރައްވާ',
    'sponsor.subtitle': 'ކޮންމެ އަކަފޫޓެއްގެ އަގަކީ 1320 ރުފިޔާއެވެ.',
    'sponsor.price': '1,320 ރުފިޔާ',
    'sponsor.per': 'ކޮންމެ އަކަފޫޓަކަށް',
    'sponsor.bank.title': 'ބެންކް ޓްރާންސްފަރ ތަފްޞީލް',
    'sponsor.bank.name': 'ބެންކް އޮފް މޯލްޑިވްސް (ބީއެމްއެލް އިސްލާމިކް)',
    'sponsor.bank.account': 'އެކައުންޓް ނަންބަރު',
    'sponsor.bank.holder': 'އެކައުންޓް ނަން',
    'sponsor.bank.holder.value': 'އަލް އިރުޝާދު',
    'sponsor.bank.note': 'ޓްރާންސްފަރ ރެފަރެންސްގެ ގޮތުގައި "އަލް އިރުޝާދު" ޖައްސަވާ.',
    'sponsor.howto': 'ޙިއްޞާ ކުރާނެ ގޮތް',
    'sponsor.step1': 'ޙިއްޞާ ކުރައްވަން ބޭނުންފުޅުވާ އަކަފޫޓް ޢަދަދު ޚިޔާރުކުރައްވާ',
    'sponsor.step2': 'މަތީގައިވާ ބެންކް އެކައުންޓަށް ފައިސާ ޖަމާކުރައްވާ',
    'sponsor.step3': 'ރެފަރެންސްގެ ގޮތުގައި "އަލް އިރުޝާދު" ޖައްސަވާ',
    'sponsor.step4': 'ތިޔަ އެހީތެރިކަން ޕްރޮގްރެސް ބާރގައި ދައްކާނެ',

    'project.title': 'މަޝްރޫޢުގެ ތަފްޞީލް',
    'project.building.title': 'އަލް އިރުޝާދުގެ އޮފީސް ޢިމާރާތް',
    'project.building.desc': 'ހުށަހެޅިފައިވާ އަލް އިރުޝާދުގެ އޮފީސް ޢިމާރާތަކީ މުސްލިމް މުޖުތަމަޢުގެ ތަފާތު ބޭނުންތައް ފުއްދައިދޭ ޒަމާނީ ތަނެކެވެ.',
    'project.purpose.title': 'އޮފީހުގެ ބޭނުން',
    'project.purpose.item1': 'އަލް އިރުޝާދުގެ އިދާރީ މަރުކަޒު',
    'project.purpose.item2': 'މުޖުތަމަޢު ކައުންސެލިންގ އަދި ސަޕޯޓް ޚިދުމަތް',
    'project.purpose.item3': 'ތަޢުލީމީ ޕްރޮގްރާމް ހިންގުން',
    'project.purpose.item4': 'ހަރަކާތް ރާވައި މުޖުތަމަޢު އެއްވެ ތިބެވޭ ޖާގަ',
    'project.purpose.item5': 'އިސްލާމީ ތަޢުލީމީ ވަސީލަތްތަކުގެ ރިސޯސް ސެންޓަރު',
    'project.sqft.title': 'އަކަފޫޓް ކޮންސެޕްޓް',
    'project.sqft.desc': 'ޢިމާރާތުގެ ޖުމްލަ ބޮޑުމިނަކީ 1,320 އަކަފޫޓެވެ. ކޮންމެ އަކަފޫޓެއް 1,320 ރުފިޔާއަށް ޙިއްޞާ ކުރެއްވޭނެއެވެ.',
    'project.gallery.title': 'ޢިމާރާތުގެ ޑިޒައިން',

    'footer.rights': '© 2026 އަލް އިރުޝާދު. އެންމެހައި ޙައްޤުތައް ލިބިގެންވޭ.',
    'footer.dua': 'ﷲ ތިޔަ ދީލަތިކަމަށް ހެޔޮ ޖަޒާ ދެއްވާށި.',

    'common.donate': 'މިހާރު ހަދިޔާ ކުރައްވާ',
    'common.learnMore': 'އިތުރަށް ބައްލަވާ',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.sponsor': 'مشاركة',
    'nav.project': 'تفاصيل المشروع',
    'nav.admin': 'لوحة الإدارة',

    'hero.title': 'ابنِ مكتب الإرشاد معاً',
    'hero.subtitle': 'انضم إلى مجتمعك في بناء مكان يخدم الجميع. شارِك بقدم مربع واترك بصمتك.',
    'hero.cta': 'شارِك بقدم مربع واحد – 1320 روفيا',

    'progress.title': 'تقدم التبرعات',
    'progress.of': 'من',
    'progress.completed': 'مكتمل',
    'progress.target': 'الهدف: MVR 1,700,000',
    'progress.goal': 'تم الوصول',
    'progress.extra': 'فوق الهدف!',

    'about.title': 'عن المشروع',
    'about.description': 'يقوم الإرشاد ببناء مكتب ليكون مركزاً لخدمات المجتمع والتعليم والتنسيق.',
    'about.why': 'لماذا هذا مهم',
    'about.why.text': 'يتيح المكتب المخصص للإرشاد خدمة المجتمع المسلم بشكل أفضل.',

    'sponsor.title': 'شارِك بقدم مربع',
    'sponsor.subtitle': 'تكلفة كل قدم مربع 1320 روفيا. مشاركتك تدعم بناء مكتب الإرشاد مباشرة.',
    'sponsor.price': '1,320 روفيا',
    'sponsor.per': 'لكل قدم مربع',
    'sponsor.bank.title': 'تفاصيل التحويل البنكي',
    'sponsor.bank.name': 'بنك المالديف (BML الإسلامي)',
    'sponsor.bank.account': 'رقم الحساب',
    'sponsor.bank.holder': 'اسم الحساب',
    'sponsor.bank.holder.value': 'الإرشاد',
    'sponsor.bank.note': 'يرجى كتابة "Al Irushaadh" كمرجع للتحويل.',
    'sponsor.howto': 'كيفية المشاركة',
    'sponsor.step1': 'اختر عدد الأقدام المربعة التي تريد المشاركة بها',
    'sponsor.step2': 'حوّل المبلغ إلى الحساب البنكي أعلاه',
    'sponsor.step3': 'اكتب "Al Irushaadh" كمرجع',
    'sponsor.step4': 'ستنعكس مساهمتك في شريط التقدم',

    'project.title': 'تفاصيل المشروع',
    'project.building.title': 'مبنى مكتب الجمعية',
    'project.building.desc': 'مبنى مكتب الجمعية الإسلامية المتحدة المقترح مصمم ليكون مساحة عصرية وعملية تخدم الاحتياجات المتنوعة للمجتمع المسلم.',
    'project.purpose.title': 'الغرض من المكتب',
    'project.purpose.item1': 'المقر الإداري للإرشاد',
    'project.purpose.item2': 'خدمات الاستشارة والدعم المجتمعي',
    'project.purpose.item3': 'تنسيق البرامج التعليمية',
    'project.purpose.item4': 'تخطيط الفعاليات ومكان التجمعات',
    'project.purpose.item5': 'مركز موارد للمواد التعليمية الإسلامية',
    'project.sqft.title': 'مفهوم القدم المربع',
    'project.sqft.desc': 'المساحة الإجمالية للمبنى 1,320 قدم مربع. قسّمنا المشروع إلى 1,320 وحدة مشاركة متساوية. بمشاركة قدم مربع أو أكثر بسعر 1,320 روفيا لكل منها، تساهم مباشرة في تحقيق هذا المشروع.',
    'project.gallery.title': 'تصميم المبنى',

    'footer.rights': '© 2026 الإرشاد. جميع الحقوق محفوظة.',
    'footer.dua': 'جزاكم الله خيراً على كرمكم.',

    'common.donate': 'تبرع الآن',
    'common.learnMore': 'اعرف المزيد',
  },
};
