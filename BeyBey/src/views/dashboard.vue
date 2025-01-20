<template>
    <div class="flex h-screen overflow-hidden">
        <!-- Side Navigation -->
        <SideNavBar @navigate="changeSection" />

        <!-- Main Content -->
        <div class="flex-grow bg-gray-100 p-6">
            <div class="bg-white shadow-xl rounded-lg p-6 border border-gray-200">
                <h1 class="text-3xl font-bold text-gray-800 mb-6">{{ currentSectionTitle }}</h1>

                <!-- Dynamic Section Rendering -->
                <div v-if="currentSection === 'dashboard'">
                    <DashboardStats />
                </div>
                <div v-else-if="currentSection === 'products'">
                    <ManageProducts />
                </div>
                <div v-else-if="currentSection === 'users'">
                    <ShowUsers />
                </div>
                <div v-else-if="currentSection === 'history'">
                    <CommandHistory />
                </div>
                <div v-else>
                    <p class="text-gray-600">Aucune section sélectionnée.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SideNavBar from "../components/SideNavBar.vue";
import DashboardStats from "../components/DashboardStats.vue";
import ManageProducts from "../components/ManageProducts.vue";
import ShowUsers from "../components/ShowUsers.vue";
import CommandHistory from "../components/CommandHistory.vue";

export default {
    components: {
        CommandHistory,
        SideNavBar,
        DashboardStats,
        ManageProducts,
        ShowUsers,
    },
    data() {
        return {
            currentSection: "dashboard", // Default section
        };
    },
    computed: {
        currentSectionTitle() {
            switch (this.currentSection) {
                case "dashboard":
                    return "Tableau de Bord";
                case "products":
                    return "Gestion des Produits";
                case "users":
                    return "Gestion des Utilisateurs";
                default:
                    return "Section Inconnue";
            }
        },
    },
    methods: {
        changeSection(section) {
            this.currentSection = section;
        },
    },
};
</script>

<style scoped>
/* Root and layout styles */
.flex {
    display: flex;
}

.h-screen {
    height: 100vh;
}

.bg-gray-100 {
    background-color: #f7fafc;
}

/* Main content styles */
.flex-grow {
    flex-grow: 1;
}

.p-6 {
    padding: 1.5rem;
}

.bg-white {
    background-color: #ffffff;
}

.text-3xl {
    font-size: 1.875rem;
    line-height: 2.25rem;
}

.font-bold {
    font-weight: 700;
}

.text-gray-800 {
    color: #1a202c;
}

.mb-6 {
    margin-bottom: 1.5rem;
}

/* Box Styling */
.shadow-xl {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.rounded-lg {
    border-radius: 0.75rem;
}

.border {
    border-width: 1px;
}

.border-gray-200 {
    border-color: #e2e8f0;
}

.text-gray-600 {
    color: #718096;
}
</style>
