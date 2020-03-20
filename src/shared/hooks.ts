import { useMemo } from 'react';

import utils from './localeUtils';
import getLanguageText, { localeLanguages } from './localeLanguages';

export const useLocaleUtils = (_locale?: any) => useMemo(() => utils(), [localeLanguages]);

export const useLocaleLanguage = (_locale?: any) => useMemo(() => getLanguageText(), [_locale]);
