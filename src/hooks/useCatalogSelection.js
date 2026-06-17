import { useState, useCallback, useMemo } from 'react';

export function useCatalogSelection(initialSelections, catalog, searchTerm) {
  const [collapsedCats, setCollapsedCats] = useState(new Set());
  
  const [selectedSubIds, setSelectedSubIds] = useState(() => {
    const ids = new Set();
    initialSelections.forEach(cat => cat.subcategories.forEach(sub => ids.add(sub.id)));
    return ids;
  });
  
  const [selectedServiceIds, setSelectedServiceIds] = useState(() => {
    const ids = new Set();
    initialSelections.forEach(cat => cat.subcategories.forEach(sub => {
      if (sub.services) sub.services.forEach(srv => ids.add(srv.id));
    }));
    return ids;
  });

  const filteredCatalog = useMemo(() => {
    if (!searchTerm) return catalog;
    const lowerSearch = searchTerm.toLowerCase();
    
    return catalog.map(cat => {
      if (cat.title.toLowerCase().includes(lowerSearch)) return cat;
      const matchingSubs = cat.subcategories.filter(sub => 
        sub.title.toLowerCase().includes(lowerSearch) || 
        sub.description.toLowerCase().includes(lowerSearch) ||
        sub.services?.some(srv => srv.title.toLowerCase().includes(lowerSearch))
      );
      if (matchingSubs.length > 0) return { ...cat, subcategories: matchingSubs };
      return null;
    }).filter(Boolean);
  }, [catalog, searchTerm]);

  const toggleAllGlobal = useCallback(() => {
    const allSubs = filteredCatalog.flatMap(c => c.subcategories);
    const allSrvs = allSubs.flatMap(s => s.services || []);
    const isAllSelected = allSubs.every(s => selectedSubIds.has(s.id)) && allSubs.length > 0;

    if (isAllSelected) {
      setSelectedSubIds(new Set());
      setSelectedServiceIds(new Set());
    } else {
      setSelectedSubIds(new Set(allSubs.map(s => s.id)));
      setSelectedServiceIds(new Set(allSrvs.map(srv => srv.id)));
    }
  }, [filteredCatalog, selectedSubIds]);

  const toggleCategoryGroup = useCallback((e, cat) => {
    e.stopPropagation();
    const subIds = cat.subcategories.map(s => s.id);
    const srvIds = cat.subcategories.flatMap(s => s.services || []).map(srv => srv.id);
    const isAllSelected = subIds.every(id => selectedSubIds.has(id)) && subIds.length > 0;

    setSelectedSubIds(prev => {
      const next = new Set(prev);
      if (isAllSelected) subIds.forEach(id => next.delete(id));
      else subIds.forEach(id => next.add(id));
      return next;
    });

    setSelectedServiceIds(prev => {
      const next = new Set(prev);
      if (isAllSelected) srvIds.forEach(id => next.delete(id));
      else srvIds.forEach(id => next.add(id));
      return next;
    });
  }, [selectedSubIds]);

  const toggleSubcategory = useCallback((sub) => {
    const srvIds = (sub.services || []).map(srv => srv.id);
    
    setSelectedSubIds(prev => {
      const next = new Set(prev);
      if (next.has(sub.id)) next.delete(sub.id);
      else next.add(sub.id);
      return next;
    });

    setSelectedServiceIds(prev => {
      const next = new Set(prev);
      if (selectedSubIds.has(sub.id)) {
        srvIds.forEach(id => next.delete(id));
      } else {
        srvIds.forEach(id => next.add(id));
      }
      return next;
    });
  }, [selectedSubIds]);

  const toggleService = useCallback((subId, serviceId) => {
    setSelectedServiceIds(prev => {
      const next = new Set(prev);
      if (next.has(serviceId)) next.delete(serviceId);
      else next.add(serviceId);
      return next;
    });
    
    setSelectedSubIds(prev => {
      const next = new Set(prev);
      next.add(subId);
      return next;
    });
  }, []);

  const toggleCollapse = useCallback((e, id) => {
    e.stopPropagation();
    setCollapsedCats(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const generateFinalSelection = useCallback(() => {
    return catalog.map(cat => {
      const selectedSubs = cat.subcategories
        .filter(sub => selectedSubIds.has(sub.id))
        .map(sub => ({
          ...sub,
          services: (sub.services || []).filter(srv => selectedServiceIds.has(srv.id))
        }));
      return { ...cat, subcategories: selectedSubs };
    }).filter(cat => cat.subcategories.length > 0);
  }, [catalog, selectedSubIds, selectedServiceIds]);

  const isAllGlobalSelected = filteredCatalog.flatMap(c => c.subcategories).every(s => selectedSubIds.has(s.id)) && filteredCatalog.length > 0;

  return {
    filteredCatalog,
    selectedSubIds,
    selectedServiceIds,
    collapsedCats,
    isAllGlobalSelected,
    toggleAllGlobal,
    toggleCategoryGroup,
    toggleSubcategory,
    toggleService,
    toggleCollapse,
    generateFinalSelection
  };
}