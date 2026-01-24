import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertNft } from "@shared/routes";

// GET /api/nfts
export function useNfts() {
  return useQuery({
    queryKey: [api.nfts.list.path],
    queryFn: async () => {
      const res = await fetch(api.nfts.list.path);
      if (!res.ok) throw new Error("Failed to fetch NFTs");
      return api.nfts.list.responses[200].parse(await res.json());
    },
  });
}

// GET /api/nfts/:id
export function useNft(id: number) {
  return useQuery({
    queryKey: [api.nfts.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.nfts.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch NFT");
      return api.nfts.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

// POST /api/nfts
export function useCreateNft() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertNft) => {
      const res = await fetch(api.nfts.create.path, {
        method: api.nfts.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.nfts.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create NFT");
      }
      
      return api.nfts.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.nfts.list.path] });
    },
  });
}
