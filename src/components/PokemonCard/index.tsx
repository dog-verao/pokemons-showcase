import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Typography } from "../Typography";
import {
  formatGenerationLabel,
  getPokemonGeneration,
} from "../../api/pokemonGeneration";
import { getPokemonTypeColor, getPokemonTypeGradient } from "../../theme/theme";
import type { PokemonCardProps } from "./PokemonCard.types";

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, href }) => {
  const theme = useTheme();
  const generation = getPokemonGeneration(pokemon.id);
  const dexNumber = `#${String(pokemon.id).padStart(3, "0")}`;
  const mainType = pokemon.types[0] ?? "normal";

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
            sx={{
              bgcolor: getPokemonTypeColor(theme, type),
              color: "#fff",
            }}
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
        background: getPokemonTypeGradient(theme, mainType),
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
