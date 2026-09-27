import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import News from "@/pages/News";
import NewsArticle from "@/pages/NewsArticle";
import Contact from "@/pages/Contact";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";

const Admin = import.meta.env.DEV ? lazy(() => import("@/pages/Admin")) : null;

function AdminRoute() {
  if (!Admin) return null;

  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Admin />
    </Suspense>
  );
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/news" component={News} />
        <Route path="/news/:id" component={NewsArticle} />
        <Route path="/contact" component={Contact} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy" component={Privacy} />
        {Admin && <Route path="/admin" component={AdminRoute} />}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return <Router />;
}

export default App;
