import { RouteProps } from 'react-router-dom'

import CategoryList from './category/list'
import CategoryCreate from './category/create'
import CategoryUpdate from './category/update'
import CategoryDelete from './category/delete'
import CategoryDetail from './category/detail'

import VideoList from './video/list'
import VideoCreate from './video/create'
import VideoUpdate from './video/update'
import VideoDelete from './video/delete'
import VideoDetail from './video/detail'

import TagList from './tag/list'
import TagCreate from './tag/create'
import TagUpdate from './tag/update'
import TagDelete from './tag/delete'
import TagDetail from './tag/detail'

export interface myRouteProps extends RouteProps {
    name: string
    label: string
}

const routes: myRouteProps[] = [
    {
        name: "categories.list",
        label: 'Listar categorias',
        path: '/categories',
        component: CategoryList,
        exact: true
    },
    {
        name: "categories.create",
        label: 'Criar categoria',
        path: '/categories/create',
        component: CategoryCreate,
        exact: true
    },
    {
        name: "categories.detail",
        label: 'Detalhe da categoria',
        path: '/categories/:id',
        component: CategoryDetail,
        exact: true
    },
    {
        name: "categories.update",
        label: 'Atualizar categoria',
        path: '/categories/:id/update',
        component: CategoryUpdate,
        exact: true
    },
    {
        name: "categories.delete",
        label: 'Remover categoria',
        path: '/categories/:id/delete',
        component: CategoryDelete,
        exact: true
    },
    
    {
        name: "videos.list",
        label: 'Listar videos',
        path: '/videos',
        component: VideoList,
        exact: true
    },
    {
        name: "videos.create",
        label: 'Criar video',
        path: '/videos/create',
        component: VideoCreate,
        exact: true
    },
    {
        name: "videos.detail",
        label: 'Detalhe do video',
        path: '/videos/:id',
        component: VideoDetail,
        exact: true
    },
    {
        name: "videos.update",
        label: 'Atualizar video',
        path: '/videos/:id/update',
        component: VideoUpdate,
        exact: true
    },
    {
        name: "videos.delete",
        label: 'Remover video',
        path: '/videos/:id/delete',
        component: VideoDelete,
        exact: true
    },

    {
        name: "tags.list",
        label: 'Listar tags',
        path: '/tags',
        component: TagList,
        exact: true
    },
    {
        name: "tags.create",
        label: 'Criar tag',
        path: '/tags/create',
        component: TagCreate,
        exact: true
    },
    {
        name: "tags.detail",
        label: 'Detalhe da tag',
        path: '/tags/:id',
        component: TagDetail,
        exact: true
    },
    {
        name: "tags.update",
        label: 'Atualizar tag',
        path: '/tags/:id/update',
        component: TagUpdate,
        exact: true
    },
    {
        name: "tags.delete",
        label: 'Remover tag',
        path: '/tags/:id/delete',
        component: TagDelete,
        exact: true
    },
]

export default routes