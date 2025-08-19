-- CreateTable
CREATE TABLE "public"."Announcement" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "preview" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AnnouncementView" (
    "id" TEXT NOT NULL,
    "announcementId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnnouncementView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Announcement_category_idx" ON "public"."Announcement"("category");

-- CreateIndex
CREATE INDEX "Announcement_publishedAt_idx" ON "public"."Announcement"("publishedAt");

-- CreateIndex
CREATE INDEX "Announcement_createdAt_idx" ON "public"."Announcement"("createdAt");

-- CreateIndex
CREATE INDEX "AnnouncementView_announcementId_idx" ON "public"."AnnouncementView"("announcementId");

-- CreateIndex
CREATE INDEX "AnnouncementView_ipAddress_idx" ON "public"."AnnouncementView"("ipAddress");

-- CreateIndex
CREATE INDEX "AnnouncementView_viewedAt_idx" ON "public"."AnnouncementView"("viewedAt");

-- CreateIndex
CREATE UNIQUE INDEX "AnnouncementView_announcementId_ipAddress_viewedAt_key" ON "public"."AnnouncementView"("announcementId", "ipAddress", "viewedAt");

-- AddForeignKey
ALTER TABLE "public"."AnnouncementView" ADD CONSTRAINT "AnnouncementView_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "public"."Announcement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
