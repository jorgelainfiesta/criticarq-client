import { helper as buildHelper } from '@ember/component/helper';
import { isPresent } from '@ember/utils';

export function contributorsNames([contributors]) {
  if (isPresent(contributors)) {
    let sumNames = '';
    contributors.forEach((contributor, i) => {
      sumNames += contributor.get('contributorName');
      if (i < contributors.get('length') - 1) {
        sumNames += ' + ';
      }
    });
    return sumNames;
  }
}

export default buildHelper(contributorsNames);
