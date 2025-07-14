import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, FileText, User, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useStore } from '@/store/useStore';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';

const Posts = () => {
  const { posts, users, addPost, updatePost, deletePost, getUserById } = useStore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = (data) => {
    const postData = {
      ...data,
      authorId: parseInt(data.authorId)
    };

    if (editingPost) {
      updatePost(editingPost.id, postData);
      toast({
        title: "✅ Post atualizado",
        description: "O post foi atualizado com sucesso!"
      });
    } else {
      addPost(postData);
      toast({
        title: "✅ Post criado",
        description: "Novo post foi adicionado ao sistema!"
      });
    }
    
    reset();
    setEditingPost(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setValue('title', post.title);
    setValue('content', post.content);
    setValue('authorId', post.authorId.toString());
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    deletePost(id);
    toast({
      title: "🗑️ Post removido",
      description: "O post foi removido do sistema."
    });
  };

  const handleNewPost = () => {
    setEditingPost(null);
    reset();
    setIsDialogOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Posts - Sistema PDR</title>
        <meta name="description" content="Gerenciamento de posts e conteúdos do sistema PDR" />
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Posts</h1>
            <p className="text-gray-400 mt-1">Gerencie os posts e conteúdos do sistema</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={handleNewPost}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingPost ? 'Editar Post' : 'Novo Post'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    {...register('title', { required: 'Título é obrigatório' })}
                    placeholder="Digite o título do post"
                  />
                  {errors.title && (
                    <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="content">Conteúdo</Label>
                  <textarea
                    id="content"
                    {...register('content', { required: 'Conteúdo é obrigatório' })}
                    placeholder="Digite o conteúdo do post"
                    className="flex min-h-[120px] w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-sm resize-none"
                  />
                  {errors.content && (
                    <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="authorId">Autor</Label>
                  <select
                    id="authorId"
                    {...register('authorId', { required: 'Autor é obrigatório' })}
                    className="flex h-10 w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-sm"
                  >
                    <option value="">Selecione um autor</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id} className="bg-slate-800">
                        {user.name}
                      </option>
                    ))}
                  </select>
                  {errors.authorId && (
                    <p className="text-red-400 text-sm mt-1">{errors.authorId.message}</p>
                  )}
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editingPost ? 'Atualizar' : 'Criar'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Search and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar posts por título ou conteúdo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <FileText className="h-8 w-8 text-purple-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{posts.length}</p>
                    <p className="text-sm text-gray-400">Total de Posts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Posts Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Lista de Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead>Conteúdo</TableHead>
                    <TableHead>Data de Criação</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post, index) => {
                    const author = getUserById(post.authorId);
                    return (
                      <motion.tr
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        className="hover:bg-white/5"
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                              <FileText className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-medium text-white max-w-xs truncate">
                              {post.title}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 text-gray-300">
                            <User className="h-4 w-4" />
                            <span>{author?.name || 'Usuário não encontrado'}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-300 max-w-md truncate block">
                            {post.content}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2 text-gray-300">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(post.createdAt).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(post)}
                              className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                              aria-label={`Editar post ${post.title}`}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(post.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                              aria-label={`Excluir post ${post.title}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </TableBody>
              </Table>

              {filteredPosts.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">
                    {searchTerm ? 'Nenhum post encontrado' : 'Nenhum post cadastrado'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default Posts;