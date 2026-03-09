using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BucketBackend.Migrations
{
    /// <inheritdoc />
    public partial class Initalsetup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    itemname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    create = table.Column<DateTime>(type: "datetime2", nullable: false),
                    update = table.Column<DateTime>(type: "datetime2", nullable: false),
                    quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Items");
        }
    }
}
