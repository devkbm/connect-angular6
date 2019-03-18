import { MenuGroup } from './menu-group';
import { Authority } from './authority';

export class UserToken {
    token: string;
    authorities: Authority[];
    menuGroupList: MenuGroup[];
}
