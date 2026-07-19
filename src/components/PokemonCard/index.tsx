import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Stack,
} from "@mui/material";
import { Typography } from "../Typography";
import {
  formatGenerationLabel,
  getPokemonGeneration,
} from "../../api/pokemonGeneration";
import type { PokemonCardProps } from "./PokemonCard.types";

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, href }) => {
  const generation = getPokemonGeneration(pokemon.id);
  const dexNumber = `#${String(pokemon.id).padStart(3, "0")}`;

  const body = (
    <CardContent>
      <CardMedia
        component="img"
        image={pokemon.imageUrl ?? undefined}
        alt={pokemon.name}
        sx={{ height: 140, objectFit: "contain" }}
      />
      <Typography component="h3" fontSize="18px">
        {pokemon.name}
      </Typography>
      <Typography color="text.secondary">{dexNumber}</Typography>
      <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
        {pokemon.types.map((type) => (
          <Chip
            key={type}
            label={`${type.charAt(0).toUpperCase()}${type.slice(1)}`}
            size="small"
          />
        ))}
      </Stack>
      {generation && (
        <Typography fontSize="12px" color="text.secondary" sx={{ mt: 1 }}>
          {formatGenerationLabel(generation)}
        </Typography>
      )}
    </CardContent>
  );

  return (
    <Card
      sx={{
        background:
          "linear-gradient(135deg, #FCFAF5 0%, #F8F2E6 45%, #F3E8CF 100%)",
        height: "100%",
      }}
    >
      {href ? (
        <CardActionArea component="a" href={href}>
          {body}
        </CardActionArea>
      ) : (
        body
      )}
    </Card>
  );
};

export default PokemonCard;
