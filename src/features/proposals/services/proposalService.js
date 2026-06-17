
let proposalsDB = [];

export const saveProposal = async (proposalData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProposal = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...proposalData
      };
      proposalsDB = [newProposal, ...proposalsDB];
      resolve(newProposal);
    }, 600);
  });
};

export const fetchProposals = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...proposalsDB]);
    }, 400);
  });
};

export const generateExcelProposal = async (proposal) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Generazione Excel per:", proposal.docMeta.commessa);
      resolve(true);
    }, 800);
  });
};