import { create } from 'zustand';

// Simulação de dados iniciais
const initialUsers = [
  { id: 1, name: 'Ana Silva', email: 'ana@exemplo.com', createdAt: '2024-01-15' },
  { id: 2, name: 'Carlos Santos', email: 'carlos@exemplo.com', createdAt: '2024-01-20' },
  { id: 3, name: 'Maria Oliveira', email: 'maria@exemplo.com', createdAt: '2024-02-01' },
  { id: 4, name: 'João Costa', email: 'joao@exemplo.com', createdAt: '2024-02-10' },
  { id: 5, name: 'Lucia Ferreira', email: 'lucia@exemplo.com', createdAt: '2024-02-15' },
];

const initialPosts = [
  { id: 1, title: 'Introdução ao React', content: 'Aprenda os conceitos básicos do React...', authorId: 1, createdAt: '2024-01-16' },
  { id: 2, title: 'Guia de JavaScript ES6', content: 'Descubra as novas funcionalidades...', authorId: 2, createdAt: '2024-01-22' },
  { id: 3, title: 'CSS Grid Layout', content: 'Domine o CSS Grid para layouts modernos...', authorId: 3, createdAt: '2024-02-02' },
  { id: 4, title: 'Node.js para Iniciantes', content: 'Comece sua jornada no backend...', authorId: 1, createdAt: '2024-02-12' },
  { id: 5, title: 'Design Responsivo', content: 'Crie interfaces que funcionam em qualquer dispositivo...', authorId: 4, createdAt: '2024-02-18' },
];

const initialPageViews = [
  { id: 1, page: '/dashboard', viewCount: 1250, createdAt: '2024-01-01', userId: 1 },
  { id: 2, page: '/users', viewCount: 890, createdAt: '2024-01-01', userId: 2 },
  { id: 3, page: '/posts', viewCount: 1100, createdAt: '2024-01-01', userId: 3 },
  { id: 4, page: '/analytics', viewCount: 650, createdAt: '2024-01-01', userId: 4 },
];

// Função para carregar dados do localStorage
const loadFromStorage = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

// Função para salvar dados no localStorage
const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
  }
};

export const useStore = create((set, get) => ({
  // Estado inicial
  users: loadFromStorage('pdr_users', initialUsers),
  posts: loadFromStorage('pdr_posts', initialPosts),
  pageViews: loadFromStorage('pdr_pageViews', initialPageViews),

  // Ações para usuários
  addUser: (user) => set((state) => {
    const newUser = { ...user, id: Date.now(), createdAt: new Date().toISOString().split('T')[0] };
    const updatedUsers = [...state.users, newUser];
    saveToStorage('pdr_users', updatedUsers);
    return { users: updatedUsers };
  }),

  updateUser: (id, userData) => set((state) => {
    const updatedUsers = state.users.map(user => 
      user.id === id ? { ...user, ...userData } : user
    );
    saveToStorage('pdr_users', updatedUsers);
    return { users: updatedUsers };
  }),

  deleteUser: (id) => set((state) => {
    const updatedUsers = state.users.filter(user => user.id !== id);
    const updatedPosts = state.posts.filter(post => post.authorId !== id);
    saveToStorage('pdr_users', updatedUsers);
    saveToStorage('pdr_posts', updatedPosts);
    return { users: updatedUsers, posts: updatedPosts };
  }),

  // Ações para posts
  addPost: (post) => set((state) => {
    const newPost = { ...post, id: Date.now(), createdAt: new Date().toISOString().split('T')[0] };
    const updatedPosts = [...state.posts, newPost];
    saveToStorage('pdr_posts', updatedPosts);
    return { posts: updatedPosts };
  }),

  updatePost: (id, postData) => set((state) => {
    const updatedPosts = state.posts.map(post => 
      post.id === id ? { ...post, ...postData } : post
    );
    saveToStorage('pdr_posts', updatedPosts);
    return { posts: updatedPosts };
  }),

  deletePost: (id) => set((state) => {
    const updatedPosts = state.posts.filter(post => post.id !== id);
    saveToStorage('pdr_posts', updatedPosts);
    return { posts: updatedPosts };
  }),

  // Ações para analytics
  addPageView: (pageView) => set((state) => {
    const newPageView = { ...pageView, id: Date.now(), createdAt: new Date().toISOString().split('T')[0] };
    const updatedPageViews = [...state.pageViews, newPageView];
    saveToStorage('pdr_pageViews', updatedPageViews);
    return { pageViews: updatedPageViews };
  }),

  // Getters computados
  getUserById: (id) => {
    const state = get();
    return state.users.find(user => user.id === id);
  },

  getPostsByAuthor: (authorId) => {
    const state = get();
    return state.posts.filter(post => post.authorId === authorId);
  },

  getTotalStats: () => {
    const state = get();
    return {
      totalUsers: state.users.length,
      totalPosts: state.posts.length,
      totalViews: state.pageViews.reduce((sum, pv) => sum + pv.viewCount, 0),
      avgViewsPerPage: state.pageViews.length > 0 
        ? Math.round(state.pageViews.reduce((sum, pv) => sum + pv.viewCount, 0) / state.pageViews.length)
        : 0
    };
  }
}));