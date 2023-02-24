import { Company, PrismaClient, Station, StationType } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  const seedCompanies: Company[] = [
    { id: 1, name: "Oy", parentCompanyId: null },
    { id: 2, name: "Child Oy", parentCompanyId: 1 },
    { id: 3, name: "Some other Oy", parentCompanyId: 1 },
    { id: 4, name: "Independent Oy", parentCompanyId: null },
  ]
  const seedStations: Station[] = [
    { id: 1, name: "Station 1", stationTypeId: 1, companyId: 1 },
    { id: 2, name: "Station 2", stationTypeId: 1, companyId: 1 },
    { id: 3, name: "Station 2", stationTypeId: 2, companyId: 2 },
  ]
  const seedStationsTypes: StationType[] = [
    { id: 1, name: "Station 1", maxPower: 10 },
    { id: 2, name: "Station 2", maxPower: 20 },
  ]

  await Promise.all(
    seedStationsTypes.map((data) =>
      prisma.stationType.upsert({
        where: { id: data.id },
        update: {},
        create: data,
      })
    )
  )
  await Promise.all(
    seedCompanies.map((data) =>
      prisma.company.upsert({
        where: { id: data.id },
        update: {},
        create: data,
      })
    )
  )
  await Promise.all(
    seedStations.map((data) =>
      prisma.station.upsert({
        where: { id: data.id },
        update: {},
        create: data,
      })
    )
  )
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
