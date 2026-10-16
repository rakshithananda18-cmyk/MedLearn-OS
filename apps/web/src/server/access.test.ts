import { describe, expect, it } from 'vitest';

import { getAccessList, isAllowed } from './access';

describe('access list', () => {
  it('is off (everyone allowed) when ACCESS_EMAILS is empty or missing', () => {
    expect(getAccessList({})).toBeNull();
    expect(getAccessList({ ACCESS_EMAILS: ' , ' })).toBeNull();
    expect(isAllowed(null, null)).toBe(true);
  });

  it('closes a production server without a list, unless it is opened on purpose', () => {
    const closed = getAccessList({ NODE_ENV: 'production' });
    expect(closed?.size).toBe(0);
    expect(isAllowed(closed, 'asha@example.com')).toBe(false);
    expect(getAccessList({ NODE_ENV: 'production', ACCESS_OPEN: 'true' })).toBeNull();
    expect(getAccessList({ NODE_ENV: 'development' })).toBeNull();
  });

  it('allows only listed emails, ignoring spaces and case', () => {
    const list = getAccessList({ ACCESS_EMAILS: ' Asha@Example.com ,ravi@example.com' });
    expect(isAllowed(list, 'asha@example.com')).toBe(true);
    expect(isAllowed(list, 'RAVI@example.com')).toBe(true);
    expect(isAllowed(list, 'stranger@example.com')).toBe(false);
    expect(isAllowed(list, undefined)).toBe(false);
  });
});
