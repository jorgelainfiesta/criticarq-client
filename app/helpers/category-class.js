import { helper as buildHelper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export function categoryClass([categorySlug]) {
  return htmlSafe(`category-${categorySlug}`);
}

export default buildHelper(categoryClass);
