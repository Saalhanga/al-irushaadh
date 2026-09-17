import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { AuthProvider } from '@/hooks/use-auth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PersistentPlayer from '@/components/PersistentPlayer';
import Home from '@/pages/public/Home';
import Explore from '@/pages/public/Explore';
import Sheikhs from '@/pages/public/Sheikhs';
import SheikhProfile from '@/pages/public/SheikhProfile';
import Topics from '@/pages/public/Topics';
import TopicDetail from '@/pages/public/TopicDetail';
import Collections from '@/pages/public/Collections';
import CollectionDetail from '@/pages/public/CollectionDetail';
import ContentDetail from '@/pages/public/ContentDetail';
import SubmitContent from '@/pages/public/SubmitContent';
import { useAuth } from '@/hooks/use-auth';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminLogin from '@/pages/admin/Login';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminSheikhs from '@/pages/admin/Sheikhs';
import AdminContent from '@/pages/admin/Content';
import AdminSubmissions from '@/pages/admin/Submissions';
import AdminReviewCenter from '@/pages/admin/ReviewCenter';
import AdminCollections from '@/pages/admin/Collections';
import AdminTopics from '@/pages/admin/Topics';
import AdminEvents from '@/pages/admin/Events';
import AdminFeatured from '@/pages/admin/Featured';
import AdminAnalytics from '@/pages/admin/Analytics';
import NotFound from '@/pages/public/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Routes>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="sheikhs" element={<AdminSheikhs />} />
                  <Route path="content" element={<AdminContent />} />
                  <Route path="submissions" element={<AdminSubmissions />} />
                  <Route path="review-center" element={<AdminReviewCenter />} />
                  <Route path="collections" element={<AdminCollections />} />
                  <Route path="topics" element={<AdminTopics />} />
                  <Route path="events" element={<AdminEvents />} />
                  <Route path="featured" element={<AdminFeatured />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                </Route>
                <Route path="/" element={
                  <>
                    <Navbar />
                    <main className="flex-1">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="/sheikhs" element={<Sheikhs />} />
                        <Route path="/sheikhs/:id" element={<SheikhProfile />} />
                        <Route path="/topics" element={<Topics />} />
                        <Route path="/topics/:id" element={<TopicDetail />} />
                        <Route path="/collections" element={<Collections />} />
                        <Route path="/collections/:id" element={<CollectionDetail />} />
                        <Route path="/audio/:id" element={<ContentDetail />} />
                        <Route path="/video/:id" element={<ContentDetail />} />
                        <Route path="/article/:id" element={<ContentDetail />} />
                        <Route path="/pdf/:id" element={<ContentDetail />} />
                        <Route path="/image/:id" element={<ContentDetail />} />
                        <Route path="/qna/:id" element={<ContentDetail />} />
                        <Route path="/quran/:id" element={<ContentDetail />} />
                        <Route path="/dua/:id" element={<ContentDetail />} />
                        <Route path="/interview/:id" element={<ContentDetail />} />
                        <Route path="/discussion/:id" element={<ContentDetail />} />
                        <Route path="/short-clip/:id" element={<ContentDetail />} />
                        <Route path="/lecture-series/:id" element={<ContentDetail />} />
                        <Route path="/course/:id" element={<ContentDetail />} />
                        <Route path="/submit" element={<SubmitContent />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                    <Footer />
                    <PersistentPlayer />
                  </>
                } />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
