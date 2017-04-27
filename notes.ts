seedStuff() {
    let everything = this.af.database.object('/').take(1)

    everything.subscribe(data => {

      console.log(data)

      let clothesSizes = this.af.database.list('/options/clothes/sizes');
      let clothesTypes = this.af.database.list('/options/clothes/types');
      let diaperBrands = this.af.database.list('/options/diapers/brands');
      let diaperSizes = this.af.database.list('/options/diapers/sizes');
      let formulaBrands = this.af.database.list('/options/formula/brands');
      let formulaStages = this.af.database.list('/options/formula/stages');
      let formulaTypes = this.af.database.list('/options/formula/types');

      data.clothes.sizes.forEach(size => {
        clothesSizes.push(size);
      })

      data.clothes.types.forEach(thing => {
        clothesTypes.push(thing);
      })

      data.diapers.brands.forEach(thing => {
        diaperBrands.push(thing);
      })

      data.diapers.sizes.forEach(thing => {
        diaperSizes.push(thing);
      })

      data.formula.brands.forEach(thing => {
        formulaBrands.push(thing);
      })

      data.formula.stages.forEach(thing => {
        formulaStages.push(thing);
      })

      data.formula.types.forEach(thing => {
        formulaTypes.push(thing);
      })
    })
  }