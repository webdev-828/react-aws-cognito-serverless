import Todo from './../assets/student/sidebar/icon-todo';
import Timeline from './../assets/student/sidebar/icon-timeline';
import Team from './../assets/student/sidebar/icon-team';
import Stats from './../assets/student/sidebar/icon-stats';
import Worksheet from './../assets/student/sidebar/icon-worksheet';
import Essays from './../assets/student/sidebar/icon-essays';
import School from './../assets/student/sidebar/icon-school';
import TodoActive from './../assets/student/sidebar/icon-todo-active';
import TimelineActive from './../assets/student/sidebar/icon-timeline-active';
import TeamActive from './../assets/student/sidebar/icon-team-active';
import StatsActive from './../assets/student/sidebar/icon-stats-active';
import WorksheetActive from './../assets/student/sidebar/icon-worksheet-active';
import EssaysActive from './../assets/student/sidebar/icon-essays-active';
import SchoolActive from './../assets/student/sidebar/icon-school-active';

export const StudentSidebar = [
    {
        icon: [Todo, TodoActive],
        title: 'TO DO',
        url: '/'
    },
    {
        icon: [Timeline, TimelineActive],
        title: 'Timeline',
        url: '/timeline'
    },
    {
        icon: [Team, TeamActive],
        title: 'My Team',
        url: '/team'
    },
    {
        icon: [Stats, StatsActive],
        title: 'My Stats',
        url: '/stats'
    },
    {
        icon: [Worksheet, WorksheetActive],
        title: 'Worksheet',
        url: '/worksheet'
    },
    {
        icon: [Essays, EssaysActive],
        title: 'Essays',
        url: '/essays'
    },
    {
        icon: [School, SchoolActive],
        title: 'School List',
        url: '/school-list'
    }
];

export const LcSidebar = [
    {
        title: 'Profile',
        url: '/'
    },
    {
        title: 'Text',
        url: '/text'
    },
    {
        title: 'Email',
        url: '/email'
    },
    {
        title: 'Students',
        url: '/lcstudents'
    },
    {
        title: 'Calendar',
        url: '/schedule'
    },
    {
        title: 'Conference Room',
        url: '/lcconference'
    },
    {
        title: 'Document',
        url: '/document'
    }
];

export const HcSidebar = [
    {
        title: 'Profile',
        url: '/'
    },
    {
        title: 'Students',
        url: '/hcstudents'
    },
    {
        title: 'Calendar',
        url: '/hcschedule'
    },
    {
        title: 'Conference Room',
        url: '/hcconference'
    }
];

export const AdminSidebar = [
    {
        title: 'Profile',
        url: '/'
    },
    {
        title: 'Students',
        url: '/students'
    },
    {
        title: 'LCS',
        url: '/lcs'
    },
    {
        title: 'HCS',
        url: '/hcs'
    }
];
