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
      label: 'ライトヘビー級',
      items: ['AAC_LH/m1', 'AAC_LH/m2', 'AAC_LH/m3', 'AAC_LH/m4'],
    },
    {
      type: 'category',
      label: 'クルーザー級',
      link: {
        type: 'doc', // ドキュメントリンクタイプ
        id: 'AAC_CW/index' // 対応するドキュメントID
      },
      items: ['AAC_CW/m1', 'AAC_CW/m2', 'AAC_CW/m3', 'AAC_CW/m4'],
    },
    {
      type: 'html',
      value: '<div class="sidebar-title">絶</div>',
      defaultStyle: true, 
    },
    {
      type: 'category',
      label: '絶 もう一つの未来',
      link: {
        type: 'doc', // ドキュメントリンクタイプ
        id: 'fru/index' // 対応するドキュメントID
      },
      items: ['fru/P1'],
    },
  ],
};

