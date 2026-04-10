const svgModules = import.meta.glob('/src/assets/svg/**/*.svg', {
  eager: true,
  as: 'component', // 作为 Vue 组件导入
})

export const useAssetsSvg = () => {
  const svgIcons = []
  Object.keys(svgModules).forEach((key) => {
    const name = key.split('/').pop().split('.')[0]
    svgIcons.push(name)
  })

  return {
    svgIcons,
    svgModules,
  }
}
