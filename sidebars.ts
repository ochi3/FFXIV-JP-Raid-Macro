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
      items: ['AAC_ライトヘビー級/m1', 'AAC_ライトヘビー級/m2', 'AAC_ライトヘビー級/m3', 'AAC_ライトヘビー級/m4'],
    },
    {
      type: 'category',
      label: 'クルーザー級',
      link: {
        type: 'doc', // ドキュメントリンクタイプ
        id: 'AAC_クルーザー級/index' // 対応するドキュメントID
      },
      items: ['AAC_クルーザー級/m1', 'AAC_クルーザー級/m2', 'AAC_クルーザー級/m3', 'AAC_クルーザー級/m4'],
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

