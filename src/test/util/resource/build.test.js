import { LANGUAGE } from '../../../constant/resource';

import { build } from '../../../util/resource';

test('', () => {
	expect(build('test')).toStrictEqual({ name: 'test', [LANGUAGE.NEUTRAL]: { value: null, comment: null }, [LANGUAGE.ENGLISH]: { value: null, comment: null } });
});
