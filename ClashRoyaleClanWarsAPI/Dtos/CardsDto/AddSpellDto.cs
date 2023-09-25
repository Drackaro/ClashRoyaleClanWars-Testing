﻿using ClashRoyaleClanWarsAPI.Models;

namespace ClashRoyaleClanWarsAPI.Dtos.CardsDto
{
    public class AddSpellDto
    {
        public string Name { get; set; }
        public DenominationEnum Type { get; set; }
        public string Description { get; set; }
        public int Elixir { get; set; }
        public QualityEnum Quality { get; set; }
        public int Damage { get; set; }
        public bool AreaDamage { get; set; }
        public TargetEnum Target { get; set; }
        public int InitialLevel { get; set; }
        public string ImageUrl { get; set; }
        public float Radius { get; set; }
        public int TowerDamage { get; set; }
        public int LifeTime { get; set; }
    }
}