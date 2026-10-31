// import { createContext, useContext } from "react";

// export let AppContext = createContext(null)

// export const AppContextProvider = AppContext.Provider;

// export const useAppContext = () => {
//     return useContext(AppContext);
// }



import { createContext, useContext, useState } from "react";
import { ownerResources } from "../data/ownerData";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // Shared resource data
  const [resources, setResources] = useState(ownerResources);

  // Add a new resource
  const addResource = (resource) => {
    const newResource = {
      ...resource,
      id: `RES${Date.now()}`,
      borrowedCopies: 0,
      status: "available",
    };

    setResources((previousResources) => [
      newResource,
      ...previousResources,
    ]);
  };

  // Update an existing resource
  const updateResource = (resourceId, updatedData) => {
    setResources((previousResources) =>
      previousResources.map((resource) =>
        resource.id === resourceId
          ? { ...resource, ...updatedData }
          : resource
      )
    );
  };

  // Delete a resource
  const deleteResource = (resourceId) => {
    setResources((previousResources) =>
      previousResources.filter(
        (resource) => resource.id !== resourceId
      )
    );
  };

  const value = {
    resources,
    setResources,
    addResource,
    updateResource,
    deleteResource,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useAppContext must be used inside AppContextProvider"
    );
  }

  return context;
};
