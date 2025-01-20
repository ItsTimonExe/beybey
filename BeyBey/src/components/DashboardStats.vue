<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
            v-for="stat in stats"
            :key="stat.label"
            class="p-6 bg-white rounded-lg shadow-md flex flex-col justify-center items-center"
        >
            <p class="text-xl font-bold">{{ stat.value }}</p>
            <p class="text-gray-500">{{ stat.label }}</p>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
    name: "DashboardStats",
    setup() {
        // Placeholder statistics (these should come from an API or backend process)
        const stats = ref([
            { label: "Clients Actifs", value: 320 },
            { label: "Commandes Totales", value: 108 },
            { label: "Revenu Total", value: "45,320 €" },
            { label: "Produits Vendus", value: 512 },
        ]);

        // Simulates fetching data from an API
        function fetchStats() {
            // Add API call logic here
            setTimeout(() => {
                stats.value = [
                    { label: "Clients Actifs", value: 350 },
                    { label: "Commandes Totales", value: 125 },
                    { label: "Revenu Total", value: "57,800 €" },
                    { label: "Produits Vendus", value: 754 },
                ];
            }, 1000); // Simulated delay
        }

        onMounted(fetchStats);

        return {
            stats,
        };
    },
};
</script>

<style scoped>
/* Styling for cards */
.grid {
    display: grid;
}
.bg-white {
    background: #ffffff;
}
.shadow-md {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
