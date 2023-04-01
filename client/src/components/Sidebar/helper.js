import {
    // SettingsOutlined,
    // ChevronLeft,
    // ChevronRightOutlined,
    HomeOutlined,
    Groups2Outlined,
    // PublicOutlined,
    // TodayOutlined,
    // CalendarMonthOutlined,
    PeopleOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    BusinessOutlined,
    ArticleOutlined,
} from '@mui/icons-material';

export const getNavItems = () => [
    {
        text: 'Dashboard',
        icon: <HomeOutlined/>
    },
    {
        text: 'General',
        icon: null
    },
    {
        text: 'Conference',
        icon: <BusinessOutlined/>
    },
    {
        text: 'Attendees',
        icon: <Groups2Outlined/>
    },
    {
        text: 'Speeches',
        icon: <ArticleOutlined/>
    },
    {
        text: 'Administrative',
        icon: null
    },
    {
        text: 'Analytics',
        icon: <TrendingUpOutlined/>
    },
    {
        text: 'Users',
        icon: <PeopleOutlined/>
    },
    {
        text: 'Settings',
        icon: <AdminPanelSettingsOutlined/>
    },
]