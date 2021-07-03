import Vue from 'vue'
import VueRouter from 'vue-router'
import NavMenu from '@/components/manager/NavMenu'
import StuTable from '@/components/manager/StuTable'
import TeacherTable from '@/components/manager/TeacherTable'
import Manager from '../views/manager/Manager.vue'
import CourseMgt from '@/components/manager/CourseMgt'
import Major from '@/components/manager/Major'
import Teacher from '@/views/teacher/Teacher.vue'
import CourseTable from '@/components/teacher/CourseTable'
import GradeTable from '@/components/teacher/GradeTable'
import Student from '@/views/stu/Student'
import QueryCourse from '@/components/stu/QueryCourse'
import SelectCourse from '@/components/stu/SelectCourse'
import MgrUpdatePwd from '@/components/manager/MgrUpdatePwd'
import StuUpdatePwd from '@/components/stu/StuUpdatePwd'
import TeaUpdatePwd from '@/components/teacher/TeaUpdatePwd'
import TeaInfo from '@/components/teacher/TeaInfo'
import StuInfo from '@/components/stu/StuInfo'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/student',
        name: 'Student',
        component: Student,
        children: [{
                path: '/student/queryCourse',
                name: 'QueryCourse',
                component: QueryCourse
            },
            {
                path: '/student/selectCourse',
                name: 'SelectCourse',
                component: SelectCourse
            },
            {
                path: '/student/stuUpdatePwd',
                name: 'StuUpdatePwd',
                component: StuUpdatePwd
            },
            {
                path: '/student/stuInfo',
                name: 'StuInfo',
                component: StuInfo
            }
        ]
    },
    {
        path: '/teacher',
        name: 'Teacher',
        component: Teacher,
        children: [{
                path: '/teacher/courseTable',
                name: 'CourseTable',
                component: CourseTable
            },
            {
                path: '/teacher/gradeTable',
                name: 'GradeTable',
                component: GradeTable
            },
            {
                path: '/teacher/teaUpdatePwd',
                name: 'TeaUpdatePwd',
                component: TeaUpdatePwd
            },
            {
                path: '/teacher/teaInfo',
                name: 'TeaInfo',
                component: TeaInfo
            },
        ]
    },
    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //         import ( /* webpackChunkName: "about" */ '../views/About.vue')
    // },
    {
        path: '/manager',
        name: 'Manager',
        component: Manager,
        children: [{
                path: '/manager/stuMgt',
                name: 'StuMgt',
                component: StuTable,
            },
            {
                path: '/manager/teaMgt',
                name: 'TeaMgt',
                component: TeacherTable,
            },
            {
                path: '/manager/courseMgt',
                name: 'CourseMgt',
                component: CourseMgt,
            }, {
                path: '/manager/majorMgt',
                name: 'MajorMgt',
                component: Major,
            }, {
                path: '/manager/mgrUpdatePwd',
                name: 'MgrUpdatePwd',
                component: MgrUpdatePwd,
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router