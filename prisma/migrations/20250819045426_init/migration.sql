-- CreateTable
CREATE TABLE "public"."Application" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthYear" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "location" TEXT NOT NULL,
    "startMonth" TEXT NOT NULL,
    "attendanceType" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "expectations" TEXT NOT NULL,
    "termsAgree" BOOLEAN NOT NULL,
    "privacyAgree" BOOLEAN NOT NULL,
    "marketingAgree" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "applicationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Survey" (
    "id" TEXT NOT NULL,
    "supporterGroup" TEXT NOT NULL,
    "participantName" TEXT NOT NULL,
    "programType" TEXT NOT NULL,
    "customProgramName" TEXT,
    "kindnessRating" TEXT NOT NULL,
    "explanationRating" TEXT NOT NULL,
    "satisfactionRating" TEXT NOT NULL,
    "recommendRating" TEXT NOT NULL,
    "participateAgain" TEXT NOT NULL,
    "participateLottery" BOOLEAN NOT NULL DEFAULT false,
    "phone" TEXT,
    "goodPoints" TEXT,
    "improvements" TEXT,
    "additionalFeedback" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Application_phone_idx" ON "public"."Application"("phone");

-- CreateIndex
CREATE INDEX "Application_email_idx" ON "public"."Application"("email");

-- CreateIndex
CREATE INDEX "Application_createdAt_idx" ON "public"."Application"("createdAt");

-- CreateIndex
CREATE INDEX "Application_status_idx" ON "public"."Application"("status");

-- CreateIndex
CREATE INDEX "Survey_participantName_idx" ON "public"."Survey"("participantName");

-- CreateIndex
CREATE INDEX "Survey_phone_idx" ON "public"."Survey"("phone");

-- CreateIndex
CREATE INDEX "Survey_submittedAt_idx" ON "public"."Survey"("submittedAt");

-- CreateIndex
CREATE INDEX "Survey_programType_idx" ON "public"."Survey"("programType");
