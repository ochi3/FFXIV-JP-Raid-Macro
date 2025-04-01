// sidebars.ts
export default {
  mySidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'ホーム',
    },
    {
      type: 'html',
      value: '<div class="sidebar-title">7.1</div>',
      defaultStyle: true, 
    },
    {
      type: 'category',
      label: 'クルーザー級',
      link: {
        type: 'doc', // ドキュメントリンクタイプ
        id: 'AAC_CW/index' // 対応するドキュメントID
      },
      items: ['AAC_CW/m5', 'AAC_CW/m6', 'AAC_CW/m7', 'AAC_CW/m8'],
    },
  ],
};

