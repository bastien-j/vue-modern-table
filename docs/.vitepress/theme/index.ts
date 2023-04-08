import { type EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { createModernTablePlugin } from '../../../src/modernTablePlugin'

export default {
  extends: DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    ctx.app.use(createModernTablePlugin())
  }
}
