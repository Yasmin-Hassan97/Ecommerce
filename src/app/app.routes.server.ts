import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'details/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'checkout/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'specificCategory/:id/:name',
    renderMode: RenderMode.Server,
  },

  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
