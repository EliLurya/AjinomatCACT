import React from "react";
import {ReactComponent as Dashboard} from '../../../../images/icons/dashboard.svg'
import {ReactComponent as ProjectIcon} from '../../../../images/icons/projects.svg'
import {ReactComponent as ProtocolsIcon} from '../../../../images/icons/protocols.svg'
import {ReactComponent as ReportsIcon} from '../../../../images/icons/reports.svg'
import {ReactComponent as PlaningIcon} from '../../../../images/icons/planing.svg'
import {ReactComponent as UsersIcon} from '../../../../images/icons/user.svg'
import {ReactComponent as SetupIcon} from '../../../../images/icons/setup.svg'
import {ReactComponent as OtherIcon} from '../../../../images/icons/other.svg'
import {getRoute} from "../../../../routes/list";

const items: MenuItem[] = [
    {
        label: 'Home',
        key: 1,
        icon: Dashboard,
        route: getRoute('dashboard')
    },
    {
        label: 'Projects',
        key: 2,
        icon: ProjectIcon,
        route: getRoute('all-projects')
    },
    {
        label: 'Protocols',
        key: 3,
        icon: ProtocolsIcon,
        route: getRoute('all-protocols')
    },
    {
        label: 'Reports',
        key: 3,
        icon: ReportsIcon,
        route: getRoute('all-reports')
    },
    {
        label: 'Planning',
        key: 3,
        icon: PlaningIcon,
        route: getRoute('all-plans')
    },
    {
        label: 'Users',
        key: 3,
        icon: UsersIcon,
        route: getRoute('all-users')
    },
    {
        label: 'Setup',
        key: 3,
        icon: SetupIcon,
        route: getRoute('all-setups')
    },
    // {
    //     label: 'Other',
    //     key: 3,
    //     icon: OtherIcon,
    //     route: getRoute('others')
    // }
];
/**
 * return all items of the menu
 * @author Amr
 */
const getMenuItems = () => items.map((item: MenuItem, index: number) => {
    item.key = index;
    return item;
})

export default getMenuItems;