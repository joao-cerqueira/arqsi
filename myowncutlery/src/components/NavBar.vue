<template>
  <div class="arqsi-nabbar">
    <v-navigation-drawer
      class="arqsi-nabbar__drawer"
      v-model="$store.state.drawer"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Administrator</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          link
          :prepend-icon="item.icon"
          value="true"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </template>

          <v-list-item v-for="(element, i) in item.elements" :key="i" link :to="element.to">
            <v-list-item-title v-text="element.title"></v-list-item-title>
          </v-list-item>
          <v-list-item href="http://127.0.0.1:5500/src/SGRAI_PROJETO/SGRAI_PROJETO/index.html"></v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Factory",
          icon: "mdi-factory",
          elements: [
            { title: "Machines", to: "/machine" },
            { title: "Machine Types", to: "/machine-type" },
            { title: "Operations", to: "/operation" },
            { title: "Operation Types", to: "/operation-type" },
            { title: "Production Lines", to: "/production-line" },
            { title: "Tools", to: "/tool" },
            { title: "Simulation", to: "/simulation" }
          ]
        },
        {
          title: "Produts",
          icon: "mdi-silverware-variant",
          elements: [
            {
              title: "Manufacturing Plan",
              to: "/manufacturing-plan"
            },
            {
              title: "Products",
              to: "/product"
            },
            {
              title: "Product Types",
              to: "/product-type"
            }
          ]
        }
      ]
    };
  }
};
</script>
