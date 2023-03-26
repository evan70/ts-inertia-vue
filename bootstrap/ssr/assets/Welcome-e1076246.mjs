import { defineComponent, computed, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import route from "ziggy-js";
import { usePage, Head, Link } from "@inertiajs/vue3";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Welcome",
  __ssrInlineRender: true,
  props: {
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String
  },
  setup(__props) {
    const user = computed(() => {
      var _a;
      return (_a = usePage().props) == null ? void 0 : _a.user;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Welcome from js Welcome.vue" }, null, _parent));
      _push(`<div class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">`);
      if (__props.canLogin) {
        _push(`<div class="hidden fixed top-0 right-0 px-6 py-4 sm:block">`);
        if (unref(user)) {
          _push(ssrRenderComponent(unref(Link), {
            href: unref(route)("dashboard"),
            class: "text-sm text-gray-700 dark:text-gray-500 underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Dashboard `);
              } else {
                return [
                  createTextVNode(" Dashboard ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(unref(Link), {
            href: unref(route)("login"),
            class: "text-sm text-gray-700 dark:text-gray-500 underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Log in `);
              } else {
                return [
                  createTextVNode(" Log in ")
                ];
              }
            }),
            _: 1
          }, _parent));
          if (__props.canRegister) {
            _push(ssrRenderComponent(unref(Link), {
              href: unref(route)("register"),
              class: "ml-4 text-sm text-gray-700 dark:text-gray-500 underline"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Register `);
                } else {
                  return [
                    createTextVNode(" Register ")
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="max-w-6xl mx-auto sm:px-6 lg:px-8"><div class="flex justify-center mt-4 sm:items-center sm:justify-between"><div class="ml-4 text-center text-sm text-gray-500 sm:text-right sm:ml-0"> Laravel v${ssrInterpolate(__props.laravelVersion)} (PHP v${ssrInterpolate(__props.phpVersion)}) </div></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Welcome.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
