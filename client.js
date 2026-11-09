window.__ModuleLoader__.load({
  id: 'dsh-brand-free',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    // Single Slots choose the lowest numeric priority. Stay below the shipped
    // priority-0 occupants without disabling their plugin; removal restores them.
    const OCCUPANT_PRIORITY = -100;

    // These selectors intentionally cover presentation only. The Hero and
    // sidebar selectors use semantic attributes and CSS-module suffixes, not
    // build hashes. Recheck them after a Harness UI upgrade.
    const SUPPRESSION_CSS = `
      [data-phase="hero"] [class*="_headline"] {
        display: none !important;
      }

      /* On macOS the toggle lives in topStrip, so an empty logoRow is pure
         whitespace. On Windows/Web the same row owns the toggle and stays. */
      [data-window-drag][class*="_logoRow"]:not(:has([data-sidebar-toggle])) {
        display: none !important;
      }

      [data-chat-running] {
        display: none !important;
      }
    `;

    function EmptyBrand() {
      return null;
    }

    // A style element owned by a Slot is removed with this plugin's fiber.
    // It has no visual box and does not replace or wrap the application root.
    function BrandSuppressionStyle() {
      return h('style', {
        'data-brand-free-style': '',
        'data-plugin': 'dsh-brand-free',
      }, SUPPRESSION_CSS);
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        // Keep the sidebar occupants atomic, matching the official brand's
        // declaration-aware lifecycle and avoiding a half-branded HMR state.
        ctx.slots.inject('sidebar.brand.mark', () =>
          ctx.slots.inject('sidebar.brand.name', function* () {
            yield ctx.slots.register({
              name: 'sidebar.brand.mark',
              priority: OCCUPANT_PRIORITY,
            }, EmptyBrand);
            yield ctx.slots.register({
              name: 'sidebar.brand.name',
              priority: OCCUPANT_PRIORITY,
            }, EmptyBrand);
          }));

        ctx.slots.inject('conversation.hero.brand.mark', () =>
          ctx.slots.register({
            name: 'conversation.hero.brand.mark',
            priority: OCCUPANT_PRIORITY,
          }, EmptyBrand));

        // shell.overlay is used only as a frame-lifetime, nonvisual style seat.
        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay',
          id: 'brand-free-suppression-style',
          order: -100,
          label: 'Brand suppression styles',
        }, BrandSuppressionStyle));
      },
    };
  },
});
