
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    }
  }
}
export const globalTypes = {
  grid: {
    name: 'grid',
    description: 'Grid',
    defaultValue: '',
    toolbar: {
      icon: 'grid',
      items: [
        {value:'grid', title: 'Show grid'},
        {value:'', title: 'Hide grid'},
    ]
    }
  },
}



export const decorators = [
  (Story, context) => {
    const grid =  context.globals.grid
    return {
      template: `<div class="storyPage ${grid}" ><story /></div>`
    }
    
  }
]
