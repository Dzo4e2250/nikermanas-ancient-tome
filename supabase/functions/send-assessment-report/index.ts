import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AssessmentRequest {
  name: string;
  email: string;
  answers: Record<string, string>;
}

const generateReport = (answers: Record<string, string>): string => {
  // Analiza odgovorov za generiranje poročila
  const emotionalState = answers['1'] || 'Ni podano';
  const stress = answers['2'] || 'Ni podano';
  const sleep = answers['3'] || 'Ni podano';
  const relationships = answers['4'] || 'Ni podano';
  const coping = answers['5'] || 'Ni podano';
  const trauma = answers['6'] || 'Ni podano';
  const mainReason = answers['7'] || 'Ni podano';
  const goals = answers['8'] || 'Ni podano';

  // Analiza stanja na podlagi odgovorov
  let riskLevel = 'nizko';
  let recommendations = [];

  // Analiza čustvenega stanja
  if (emotionalState.includes('Zelo slabo') || emotionalState.includes('Slabo')) {
    riskLevel = 'visoko';
    recommendations.push('Priporočamo takojšnje iskanje strokovne pomoči');
  } else if (emotionalState.includes('Povprečno')) {
    riskLevel = 'zmerno';
    recommendations.push('Koristne bi bile redne terapijske seje');
  } else {
    recommendations.push('Vaše čustveno stanje je stabilno, vendar je preventivna skrb vedno dobrodošla');
  }

  // Analiza stresa
  if (stress.includes('Skoraj vsak dan') || stress.includes('Ves čas')) {
    riskLevel = 'visoko';
    recommendations.push('Nujno potrebujete tehnike obvladovanja stresa');
  } else if (stress.includes('Pogosto')) {
    riskLevel = 'zmerno';
    recommendations.push('Naučiti se morate učinkovitih tehnik sproščanja');
  }

  // Analiza spanja
  if (sleep.includes('Zelo slabo') || sleep.includes('kronične težave')) {
    riskLevel = 'visoko';
    recommendations.push('Spalne težave močno vplivajo na duševno zdravje - potrebujete pomoč');
  }

  // Analiza travme
  if (trauma === 'da') {
    riskLevel = 'visoko';
    recommendations.push('Priporočamo specializirano pomoč za obdelavo travme');
  }

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { color: #8B4513; font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .subtitle { color: #666; font-size: 16px; }
        .section { margin-bottom: 25px; }
        .section-title { color: #8B4513; font-size: 20px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #8B4513; padding-bottom: 5px; }
        .risk-low { color: #28a745; font-weight: bold; }
        .risk-medium { color: #ffc107; font-weight: bold; }
        .risk-high { color: #dc3545; font-weight: bold; }
        .recommendation { background: #f8f9fa; padding: 15px; border-left: 4px solid #8B4513; margin: 10px 0; }
        .contact { background: #e9ecef; padding: 20px; border-radius: 5px; text-align: center; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Tanja & Edo - Terapevtski Center</div>
            <div class="subtitle">Osebno poročilo o vašem duševnem stanju</div>
        </div>

        <div class="section">
            <h2 class="section-title">Povzetek vaše ocene</h2>
            <p><strong>Čustveno stanje:</strong> ${emotionalState}</p>
            <p><strong>Stres in anksioznost:</strong> ${stress}</p>
            <p><strong>Kakovost spanja:</strong> ${sleep}</p>
            <p><strong>Odnosi:</strong> ${relationships}</p>
            <p><strong>Obvladovanje izzivov:</strong> ${coping}</p>
            <p><strong>Travmatske izkušnje:</strong> ${trauma === 'da' ? 'Da' : 'Ne'}</p>
        </div>

        <div class="section">
            <h2 class="section-title">Ocena stanja</h2>
            <p>Na podlagi vaših odgovorov ocenjujemo vaše trenutno stanje kot 
            <span class="risk-${riskLevel === 'nizko' ? 'low' : riskLevel === 'zmerno' ? 'medium' : 'high'}">
                ${riskLevel.toUpperCase()} TVEGANJE
            </span></p>
        </div>

        <div class="section">
            <h2 class="section-title">Priporočila za vas</h2>
            ${recommendations.map(rec => `<div class="recommendation">${rec}</div>`).join('')}
        </div>

        <div class="section">
            <h2 class="section-title">Vaši cilji</h2>
            <p><strong>Glavni razlog za iskanje pomoči:</strong> ${mainReason}</p>
            <p><strong>Kaj bi radi dosegli:</strong> ${goals}</p>
        </div>

        <div class="contact">
            <h3>Kontaktirajte nas za svetovanje</h3>
            <p>Na podlagi tega poročila vam priporočamo, da se obrnete na nas za osebno svetovanje.</p>
            <p><strong>Email:</strong> info@tanja-edo.si</p>
            <p><strong>Telefon:</strong> +386 XX XXX XXX</p>
        </div>

        <div class="footer">
            <p>To poročilo je avtomatsko generirano na podlagi vaših odgovorov in služi kot začetna ocena. 
            Ne nadomešča strokovne diagnoze.</p>
            <p>&copy; 2025 Tanja & Edo - Terapevtski Center</p>
        </div>
    </div>
</body>
</html>`;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, answers }: AssessmentRequest = await req.json();

    if (!name || !email || !answers) {
      return new Response(
        JSON.stringify({ error: "Manjkajo zahtevani podatki" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const reportHtml = generateReport(answers);

    const emailResponse = await resend.emails.send({
      from: "Tanja & Edo <onboarding@resend.dev>",
      to: [email],
      subject: "Vaše osebno poročilo o duševnem stanju",
      html: reportHtml,
    });

    console.log("Assessment report sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Poročilo je bilo uspešno poslano na vašo email naslov." 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-assessment-report function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);