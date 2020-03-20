import { useMemo } from 'react';

import utils from './localeUtils';
import { localeLanguages } from './localeLanguages';

export const useLocaleUtils = (_locale?: any) => useMemo(() => utils(), [localeLanguages]);
